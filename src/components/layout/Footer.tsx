export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-slate-500">
        &copy; {year} Chaptering Officer Portal. Internal prototype &mdash; not for production use.
      </div>
    </footer>
  );
}
