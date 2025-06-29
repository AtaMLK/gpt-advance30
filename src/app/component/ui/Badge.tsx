export default function Badge({ label }: { label: string }) {
  return (
    <span className="text-xs px-2 py-1 dark:bg-stone-600 dark:text-stone-100 bg-blue-100 text-blue-700 rounded">
      {label}
    </span>
  );
}
