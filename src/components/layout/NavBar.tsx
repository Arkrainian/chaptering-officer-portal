import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/cn';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/cases', label: 'Cases' },
  { to: '/officers', label: 'Officers' },
  { to: '/settings', label: 'Settings' },
  { to: '/database-demo', label: 'Database Demo' },
];

export function NavBar() {
  return (
    <nav className="flex flex-wrap items-center gap-1">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) =>
            cn(
              'rounded-md px-3 py-2 text-sm font-medium transition-colors',
              isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100',
            )
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
