import { z } from "zod";

export const ProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.coerce.number().min(0.1, "Price should be positive"),
  description: z.string().optional(),
  image: z
    .any()
    .refine((file) => file?.length === 1, "Image is required")
    .refine((files) => files?.[0]?.size < 1024 * 1024)
    .refine(
      (files) =>
        ["image/jpeg", "image/png", "image/webp"].includes(files?.[0]?.type),
      "jpeg , png and webp just accepted"
    ),
});

export type ProductForm = z.infer<typeof ProductSchema>;
