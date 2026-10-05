import { AlertTriangle } from "lucide-react";

export default function ErrorState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 min-h-[60vh] text-center">
      <AlertTriangle className="h-10 w-10 text-red-500" />
      <h2 className="text-lg font-semibold">Something went wrong</h2>
      <p className="text-sm text-gray-500">
        {message || "Please try again later."}
      </p>
    </div>
  );
}
