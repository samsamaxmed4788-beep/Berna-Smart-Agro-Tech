import { useState } from 'react';
import { Plus, Search, MoreVertical, Edit, Trash2 } from 'lucide-react';

const mockBatches = [
  { id: 'LB-801', breed: 'Somali Blackhead', count: 50, avgWeight: '22kg', status: 'Healthy', entryDate: '2023-10-01' },
  { id: 'LB-802', breed: 'Boran Cross', count: 30, avgWeight: '180kg', status: 'Monitoring', entryDate: '2023-10-15' },
  { id: 'LB-803', breed: 'Somali Blackhead', count: 100, avgWeight: '18kg', status: 'Healthy', entryDate: '2023-11-02' },
];

const LivestockManager = () => {
  const [batches, setBatches] = useState(mockBatches);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddBatch = (e) => {
    e.preventDefault();
    const newBatch = {
      id: `LB-${Math.floor(Math.random() * 900) + 100}`,
      breed: e.target.breed.value,
      count: e.target.count.value,
      avgWeight: e.target.weight.value + 'kg',
      status: 'Healthy',
      entryDate: new Date().toISOString().split('T')[0]
    };
    setBatches([newBatch, ...batches]);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Livestock Manager</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage batches, track health, and monitor growth.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-berna-green text-white font-bold rounded-xl hover:bg-berna-green-dark transition-colors shadow-lg shadow-berna-green/30"
        >
          <Plus className="w-5 h-5" /> Add Batch
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search batches..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-berna-green dark:text-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Batch ID</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Breed</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Head Count</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Avg Weight</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Entry Date</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Status</th>
                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch) => (
                <tr key={batch.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-berna-blue">{batch.id}</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">{batch.breed}</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">{batch.count}</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">{batch.avgWeight}</td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">{batch.entryDate}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      batch.status === 'Healthy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                    }`}>
                      {batch.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-berna-green transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Add Livestock Batch</h2>
            <form onSubmit={handleAddBatch} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Breed</label>
                <input type="text" name="breed" required className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-berna-green dark:text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Head Count</label>
                  <input type="number" name="count" required className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-berna-green dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Initial Avg Weight (kg)</label>
                  <input type="number" name="weight" required className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-berna-green dark:text-white" />
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-3 rounded-xl font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-3 rounded-xl font-bold bg-berna-green text-white hover:bg-berna-green-dark transition-colors shadow-lg shadow-berna-green/30">
                  Save Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LivestockManager;
