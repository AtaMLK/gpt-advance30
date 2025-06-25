import { useForm } from "react-hook-form";

interface LoginFormInputs {
  user: string;
  email: string;
  password: string;
}

export default function LoginFrom() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Form Data : ", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-[40%]"
    >
      <input
        type="text"
        {...register("user", { required: "min 3 chars" })}
        placeholder="Enter valid user name"
        className="border p-2"
      />
      {errors.user && <p className="">{errors.user.message}</p>}
      <input
        type="email"
        {...register("email", { required: "Enter a valid email" })}
        placeholder="Email"
        className="border p-2"
        minLength={3}
      />
      {errors.email && <p className="">{errors.email.message}</p>}
      <input
        type="password"
        {...register("password", { required: "Please enter a Valid password" })}
        placeholder="Password"
        className="border p-2"
        minLength={6}
      />
      {errors.password && <p className="">{errors.password.message}</p>}
      <button
        type="submit"
        className="px-4 py-2 bg-stone-300 text-xl transition -all hover:bg-stone-600 hover:text-stone-100 rounded duration-300"
      >
        Log in
      </button>
    </form>
  );
}
