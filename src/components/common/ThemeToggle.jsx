import { Moon, Sun } from "lucide-react";
import { useTheme } from "../ui/theme-provider";
import { useResolvedTheme } from "../../hooks/useResolvedTheme";

export default function ThemeToggle() {
  const { setTheme } = useTheme();
  const isDark = useResolvedTheme() === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors hover:bg-card"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
