import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, ListOrdered, Wallet, Settings, LogOut, Leaf } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Overview', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Livestock Manager', path: '/admin/livestock', icon: <ListOrdered className="w-5 h-5" /> },
    { name: 'Investment Ledger', path: '/admin/investments', icon: <Wallet className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex pt-24">
      {/* Sidebar */}
      <aside className="w-64 fixed left-0 h-[calc(100vh-6rem)] bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-berna-green flex items-center justify-center text-white">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-800 dark:text-white">Admin Panel</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                location.pathname === item.path 
                  ? 'bg-berna-green text-white shadow-lg shadow-berna-green/30' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 pb-24 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
