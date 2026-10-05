import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  ClipboardList,
  Home,
  LogIn,
  LogOut,
  MapPin,
  Moon,
  Search,
  Sparkles,
  Sun,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { useTheme } from "../ui/theme-provider";
import { useResolvedTheme } from "../../hooks/useResolvedTheme";
import useProperties from "../../hooks/properties/useProperties";
import { useLogoutUser } from "../../hooks/auth/userLogoutUser";
import { useAuthStore } from "../../store/authStore";
import { DEMO_ACCOUNT } from "../../utils/default";

const isMac =
  typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

export const shortcutLabel = isMac ? "⌘K" : "Ctrl K";

function useDebouncedValue(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function CommandPalette({ open, onOpenChange }) {
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  const isDark = useResolvedTheme() === "dark";
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const role = useAuthStore((state) => state.role);
  const { mutate: logoutUser } = useLogoutUser();

  const [search, setSearch] = useState("");
  const query = useDebouncedValue(search.trim(), 300);

  const { property: results, isFetching } = useProperties(
    { search: query, pageNumber: 1, pageSize: 5 },
    { enabled: open && query.length >= 2 },
  );

  // Toggle with Cmd/Ctrl + K from anywhere
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        onOpenChange((current) => !current);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  const run = (action) => {
    onOpenChange(false);
    action();
  };

  const showResults = query.length >= 2 && search.trim() === query;

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search UrbanEstate"
      description="Jump to a page, run an action or search properties."
    >
      <CommandInput
        placeholder="Search properties by city, or type a command…"
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>
          {isFetching ? "Searching…" : "No results found."}
        </CommandEmpty>

        {showResults && (
          <CommandGroup heading="Properties">
            {results.map((property) => (
              <CommandItem
                key={property._id}
                value={`property-${property._id}`}
                keywords={[search]}
                onSelect={() => run(() => navigate(`/property/${property._id}`))}
              >
                <img
                  src={property.propertyImage}
                  alt=""
                  className="h-9 w-12 shrink-0 rounded object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate font-medium">{property.name}</p>
                  <p className="flex items-center gap-1 truncate text-xs text-muted-foreground capitalize">
                    <MapPin className="!size-3" />
                    {property.location}
                  </p>
                </div>
                {property.price && (
                  <span className="ml-auto shrink-0 text-xs font-semibold">
                    ₹ {property.price.toLocaleString("en-IN")}
                  </span>
                )}
              </CommandItem>
            ))}
            <CommandItem
              value="see-all-results"
              keywords={[search]}
              onSelect={() =>
                run(() =>
                  navigate(`/property?search=${encodeURIComponent(query)}`),
                )
              }
            >
              <Search />
              See all results for “{query}”
            </CommandItem>
          </CommandGroup>
        )}

        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => run(() => navigate("/"))}>
            <Home />
            Home
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate("/property"))}>
            <Building2 />
            Browse properties
          </CommandItem>
          {isLoggedIn && role === "landlord" && (
            <CommandItem onSelect={() => run(() => navigate("/property/my"))}>
              <Building2 />
              My properties
            </CommandItem>
          )}
          {isLoggedIn && role === "tenant" && (
            <CommandItem onSelect={() => run(() => navigate("/application"))}>
              <ClipboardList />
              My applications
            </CommandItem>
          )}
          {isLoggedIn && (
            <CommandItem onSelect={() => run(() => navigate("/profile"))}>
              <User />
              Profile
            </CommandItem>
          )}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem
            keywords={["theme", "dark", "light", "mode"]}
            onSelect={() => run(() => setTheme(isDark ? "light" : "dark"))}
          >
            {isDark ? <Sun /> : <Moon />}
            Switch to {isDark ? "light" : "dark"} mode
          </CommandItem>
          {isLoggedIn ? (
            <CommandItem
              onSelect={() =>
                run(() => logoutUser(undefined, { onSuccess: () => navigate("/") }))
              }
            >
              <LogOut />
              Log out
            </CommandItem>
          ) : (
            <>
              {DEMO_ACCOUNT && (
                <CommandItem onSelect={() => run(() => navigate("/auth/login"))}>
                  <Sparkles />
                  Try the demo account
                </CommandItem>
              )}
              <CommandItem onSelect={() => run(() => navigate("/auth/login"))}>
                <LogIn />
                Log in
              </CommandItem>
            </>
          )}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
