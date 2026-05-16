import { useState } from 'react';
import { Search, CheckCircle2, Clock, Filter } from 'lucide-react';

const mockInvestments = [
  { id: 'INV-1029', phone: '+252 63 448 2134', amount: 500, method: 'ZAAD', date: '2023-11-15', status: 'Pending' },
  { id: 'INV-1028', phone: '+252 65 123 4567', amount: 1500, method: 'e-Dahab', date: '2023-11-14', status: 'Confirmed' },
  { id: 'INV-1027', phone: '+252 63 987 6543', amount: 250, method: 'ZAAD', date: '2023-11-14', status: 'Confirmed' },
  { id: 'INV-1026', phone: '+252 63 555 1234', amount: 1000, method: 'ZAAD', date: '2023-11-13', status: 'Pending' },
];

const InvestmentLedger = () => {
  const [investments, setInvestments] = useState(mockInvestments);
  const [filter, setFilter] = useState('All');

  const handleConfirm = (id) => {
    setInvestments(investments.map(inv => 
      inv.id === id ? { ...inv, status: 'Confirmed' } : inv
    ));
  };

  const filteredInvestments = investments.filter(inv => 
    filter === 'All' ? true : inv.status === filter
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Investment Ledger</h1>
          <p className="text-slate-600 dark:text-slate-400">Verify and manage incoming investor pledges.</p>
        </div>
        <div className="flex gap-2 bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          {['All', 'Pending', 'Confirmed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                filter === f 
                  ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by ID or Phone..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-berna-green dark:text-white"
            />
          </div>
          <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Transaction ID</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Investor Phone</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Amount</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Method</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Date</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Status</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvestments.map((inv) => (
                <tr key={inv.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{inv.id}</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">{inv.phone}</td>
                  <td className="p-4 font-bold text-berna-green">${inv.amount}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs font-semibold text-slate-600 dark:text-slate-300">
                      {inv.method}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">{inv.date}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      inv.status === 'Confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                    }`}>
                      {inv.status === 'Confirmed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {inv.status === 'Pending' ? (
                      <button 
                        onClick={() => handleConfirm(inv.id)}
                        className="px-4 py-1.5 bg-berna-green text-white text-sm font-bold rounded-lg hover:bg-berna-green-dark transition-colors"
                      >
                        Confirm
                      </button>
                    ) : (
                      <span className="text-slate-400 text-sm italic">Verified</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvestmentLedger;
