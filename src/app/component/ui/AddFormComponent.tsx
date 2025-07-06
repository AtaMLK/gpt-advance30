    /* eslint-disable @typescript-eslint/no-unused-expressions */
    /* eslint-disable @typescript-eslint/no-unused-vars */
    "use client";
    import { supabase } from "@/app/lib/supabaseClient";
    import { useToastStore } from "@/app/lib/toastStore";
    import { ProductSchema } from "@/app/lib/validation/productSchema";
    import { zodResolver } from "@hookform/resolvers/zod";
    import { useState } from "react";
    import { useForm } from "react-hook-form";
    import ToastList from "./ToastList";

    export default function AddFormComponent() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const { showToast } = useToastStore();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ProductSchema>({
        resolver: zodResolver(ProductSchema),
    });

    const onSubmit = async (data: ProductSchema) => {
        try {
        setLoading(true);

        const file = data.image[0];
        const fileName = `${Date.now()} ${file.name}`;
        const { data: imageData, error: uploadError } = await supabase.storage
            .from("products")
            .upload(fileName, file);

        if (uploadError) throw uploadError;

        const imageUrl = imageData?.path;

        const { error: insertError } = await supabase.from("tsproducts").insert([
            {
            title: data.title,
            price: data.price,
            description: data.description,
            image_url: imageUrl,
            },
        ]);
        if (insertError) showToast(insertError.message, "error", 3000);
        } catch (err: any) {
        showToast(err.message || "something went wrong", "info", 3000);
        } finally {
        showToast("New product added", "success", 3000);

        reset();
        setLoading(false);
        setSuccess(true);
        }
    };
    return (
        <div>
        <ToastList />
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 p-4 max-w-md mx-auto"
        >
            <input
            {...register("title")}
            placeholder="Title"
            className="w-full p-2 border rounded"
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            <input
            type="number"
            {...register("price")}
            placeholder="Price"
            className="w-full p-2 rounded border"
            />
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
            <textarea
            {...register("description")}
            placeholder="description"
            className="w-full p-2 border rounded"
            />
            <input
            type="file"
            accept="image/"
            {...register("image")}
            className="w-full"
            onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                setPreview(URL.createObjectURL(file));
                }
            }}
            />
            {preview && (
            <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded"
            />
            )}
            {typeof errors.image?.message === "string" && (
            <p className="text-red-500">{errors.image.message}</p>
            )}
            <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
            {isSubmitting ? "...Submitting" : "Add product"}
            </button>
            {success && (
            <p className="text-green-600">Product added successfully!</p>
            )}
        </form>
        </div>
    );
    }
