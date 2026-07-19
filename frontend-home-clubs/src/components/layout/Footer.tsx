import { Link } from "react-router-dom";
import { Pin, Mail, AtSign } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-ink text-paper-light">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Pin size={20} className="-rotate-12 text-signal" strokeWidth={2.5} />
              <span className="font-display text-xl tracking-tight">ClubHub</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-paper/70">
              Every club on campus, pinned in one place. Find your people, see
              when they meet, and show up.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-signal">
              Browse
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/" className="focus-ring rounded-sm text-paper/80 hover:text-paper-light">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/clubs" className="focus-ring rounded-sm text-paper/80 hover:text-paper-light">
                  Club Directory
                </Link>
              </li>
              <li>
                <Link
                  to="/clubs?category=Technology"
                  className="focus-ring rounded-sm text-paper/80 hover:text-paper-light"
                >
                  Technology clubs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-signal">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2 text-paper/80">
                <Mail size={15} /> studentlife@campus.edu
              </li>
              <li className="flex items-center gap-2 text-paper/80">
                <AtSign size={15} /> @campusstudentlife
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-paper/15 pt-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} ClubHub · Office of Student Life</span>
          <span className="font-mono">Built for students, by students.</span>
        </div>
      </div>
    </footer>
  );
}
