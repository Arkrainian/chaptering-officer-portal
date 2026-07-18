import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { NavBar } from './NavBar';

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/">
          <Logo />
        </Link>
        <NavBar />
      </div>
    </header>
  );
}
