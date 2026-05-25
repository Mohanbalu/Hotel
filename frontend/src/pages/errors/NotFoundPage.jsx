import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">404</p>
      <h1 className="mt-4 text-5xl font-semibold text-white">Page not found</h1>
      <p className="mt-4 max-w-lg text-sm leading-6 text-slate-400">
        The requested route is not available in this frontend skeleton.
      </p>
      <Link to="/" className="mt-8 rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
        Back to Home
      </Link>
    </div>
  );
}