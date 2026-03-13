import { NavLink } from 'react-router-dom';
import { DollarSign, LayoutDashboard, ArrowLeftRight, Settings } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/transacoes', icon: ArrowLeftRight, label: 'Transações' },
  { to: '/configuracoes', icon: Settings, label: 'Configurações' },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 h-screen bg-white border-r border-gray-200 flex-col sticky top-0">
      {/* Logo */}
      <div className="p-6 flex items-center gap-2">
        <div className="bg-purple-600 text-white rounded-lg p-1.5">
          <DollarSign size={20} />
        </div>
        <span className="font-bold text-gray-900">Gestão Financeira</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-purple-50 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <item.icon size={20} />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t text-xs text-gray-400 text-center">
        &copy; 2024 Gestão Financeira
      </div>
    </aside>
  );
}
