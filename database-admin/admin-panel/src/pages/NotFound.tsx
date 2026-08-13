import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-5xl font-bold text-slate-200">404</p>
      <h1 className="mt-2 text-lg font-semibold text-slate-900">Page not found</h1>
      <Link to="/" className="mt-4 text-sm font-medium text-brand-600 hover:underline">
        Back to Dashboard
      </Link>
    </div>
  );
}
