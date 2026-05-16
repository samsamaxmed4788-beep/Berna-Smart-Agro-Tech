import { Activity, Users, Wallet, AlertCircle } from 'lucide-react';

const StatCard = ({ title, value, trend, icon, colorClass }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
        {icon}
      </div>
      {trend && (
        <span className={`text-sm font-semibold px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</h3>
    <div className="text-3xl font-bold text-slate-900 dark:text-white">{value}</div>
  </div>
);

const AdminDashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Overview Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">Welcome back, Admin. Here is what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Pledged" 
          value="$124,500" 
          trend={12.5} 
          icon={<Wallet className="w-6 h-6 text-white" />} 
          colorClass="bg-berna-green"
        />
        <StatCard 
          title="Active Investors" 
          value="1,204" 
          trend={5.2} 
          icon={<Users className="w-6 h-6 text-white" />} 
          colorClass="bg-blue-500"
        />
        <StatCard 
          title="Active Batches" 
          value="8" 
          icon={<Activity className="w-6 h-6 text-white" />} 
          colorClass="bg-purple-500"
        />
        <StatCard 
          title="System Alerts" 
          value="2" 
          icon={<AlertCircle className="w-6 h-6 text-white" />} 
          colorClass="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recent Pledges</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Batch #LB-80{i + 1}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Via ZAAD - +252 63 XXX {i}234</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-berna-green">${i * 100 + 50}</div>
                  <div className="text-xs text-slate-500">2 mins ago</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">System Health</h2>
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-2 text-orange-700 dark:text-orange-400 font-bold mb-1">
                <AlertCircle className="w-5 h-5" /> High Temp Alert
              </div>
              <p className="text-sm text-orange-600 dark:text-orange-300">Pen B-12 temperature exceeded 28°C. Cooling fans engaged.</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-bold mb-1">
                <Activity className="w-5 h-5" /> Fodder System Normal
              </div>
              <p className="text-sm text-green-600 dark:text-green-300">Hydroponic nutrient delivery optimal. Next cycle in 2 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
