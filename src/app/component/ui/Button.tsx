interface ButtonProps {
  children: React.ReactNode;
  onclick?: () => void;
  variant?: "primary" | "outline";
}

export default function Button({ children, onclick, variant }: ButtonProps) {
  const base = "px-4 py-2 rounded font-semibold";
  const style =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "border border-blue-600 text-blue-600 hover:bg-blue-800";
  return (
    <button onClick={onclick} className={`${base} ${style}`}>
      {children}
    </button>
  );
}
