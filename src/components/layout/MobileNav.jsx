import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, Settings } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/transacoes', icon: ArrowLeftRight, label: 'Transações' },
  { to: '/configuracoes', icon: Settings, label: 'Configurações' },
];

export default function MobileNav() {
  return (
    <nav className="flex md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex justify-around w-full py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1 text-xs font-medium ${
                isActive ? 'text-purple-600' : 'text-gray-400'
              }`
            }
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
