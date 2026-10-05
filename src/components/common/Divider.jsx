export default function Divider({ text = "OR" }) {
  return (
    <div className="flex w-full items-center gap-3 text-xs text-muted-foreground">
      <span className="h-px flex-1 bg-border"></span>
      <span>{text}</span>
      <span className="h-px flex-1 bg-border"></span>
    </div>
  );
}
