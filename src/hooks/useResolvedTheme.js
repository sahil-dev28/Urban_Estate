import { useEffect, useState } from "react";
import { useTheme } from "../components/ui/theme-provider";

const darkQuery = "(prefers-color-scheme: dark)";

// Turns "system" into the actual "light" | "dark" the user is seeing.
export function useResolvedTheme() {
  const { theme } = useTheme();
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia(darkQuery).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(darkQuery);
    const onChange = (event) => setSystemDark(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  if (theme === "system") return systemDark ? "dark" : "light";
  return theme;
}
