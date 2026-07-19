import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Pin } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/clubs", label: "Directory" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `focus-ring rounded-sm px-1 py-1 font-mono text-sm uppercase tracking-wide transition-colors ${
      isActive ? "text-poster" : "text-ink hover:text-poster"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper-light/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <NavLink
          to="/"
          className="focus-ring flex items-center gap-2 rounded-sm"
          onClick={() => setOpen(false)}
        >
          <Pin size={22} className="shrink-0 -rotate-12 text-poster" strokeWidth={2.5} />
          <span className="font-display text-2xl tracking-tight text-ink">
            Club<span className="text-poster">Hub</span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-8 sm:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === "/"}>
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/clubs"
            className="focus-ring rounded-sm bg-ink px-4 py-2 font-mono text-sm uppercase tracking-wide text-paper-light transition-colors hover:bg-poster"
          >
            Find a club
          </NavLink>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="focus-ring rounded-sm p-2 text-ink sm:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t-2 border-ink bg-paper-light px-5 pb-5 pt-3 sm:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `focus-ring rounded-sm px-2 py-3 font-mono text-base uppercase tracking-wide ${
                  isActive ? "text-poster" : "text-ink"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
