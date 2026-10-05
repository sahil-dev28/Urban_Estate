export default function Divider({ text = "OR" }) {
  return (
    <div className="flex w-full items-center gap-3 text-xs text-gray-500">
      <span className="h-px flex-1 bg-gray-200"></span>
      <span>{text}</span>
      <span className="h-px flex-1 bg-gray-200"></span>
    </div>
  );
}
