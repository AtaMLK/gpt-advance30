interface InputProps {
  placeHolder?: string;
  type?: string;
}

export default function Input({ placeHolder, type = "text" }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeHolder}
      className="border px-4 py-2 rounded  focus:outline-blue-600 w-[70%] mx-auto"
    />
  );
}
