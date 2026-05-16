import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wallet, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

const mockChartData = [
  { month: 'Jan', roi: 0, projected: 0 },
  { month: 'Feb', roi: 2, projected: 4 },
  { month: 'Mar', roi: 5, projected: 8 },
  { month: 'Apr', roi: 12, projected: 12 },
  { month: 'May', roi: 18, projected: 16 },
  { month: 'Jun', roi: 24, projected: 22 },
  { month: 'Jul', roi: 30, projected: 28 },
];

const Investment = () => {
  const [pledgeData, setPledgeData] = useState({
    batchId: 'LB-802',
    amount: '',
    paymentMethod: 'zaad',
    phoneNumber: ''
  });
  
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success

  const handlePledgeSubmit = (e) => {
    e.preventDefault();
    setPaymentStatus('processing');
    
    // Simulate payment gateway delay
    setTimeout(() => {
      setPaymentStatus('success');
    }, 2000);
  };

  return (
    <div className="pt-24 pb-20 px-6 md:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Investment Portal</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Secure, transparent, and tech-driven ROI through Somaliland's first Smart Agro-Tech Complex.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          
          {/* ROI Dashboard (Left Side) */}
          <div className="lg:col-span-3 space-y-6">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-6 rounded-2xl border-l-4 border-l-berna-green">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Average Annual ROI</p>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">24.5%</div>
              </div>
              <div className="glass p-6 rounded-2xl border-l-4 border-l-berna-blue">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Total Active Investors</p>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">1,204</div>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl h-[400px]">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <TrendingUp className="text-berna-blue" /> Projected vs Actual Returns
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRoi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#2E7D32" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1565C0" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#1565C0" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="month" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(val) => `${val}%`} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="projected" stroke="#1565C0" fillOpacity={1} fill="url(#colorProjected)" strokeDasharray="5 5" name="Projected ROI (%)" />
                  <Area type="monotone" dataKey="roi" stroke="#2E7D32" strokeWidth={3} fillOpacity={1} fill="url(#colorRoi)" name="Actual ROI (%)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
          </div>

          {/* Investment Pledge Form (Right Side) */}
          <div className="lg:col-span-2">
            <div className="glass p-8 rounded-2xl sticky top-28 border border-white/50 shadow-2xl">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Pledge Investment</h3>
              
              {paymentStatus === 'success' ? (
                <div className="text-center py-10 space-y-4 animate-fade-in">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-berna-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">Payment Successful</h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    Your pledge of ${pledgeData.amount} for Batch {pledgeData.batchId} has been confirmed. You will receive an SMS receipt shortly.
                  </p>
                  <button 
                    onClick={() => setPaymentStatus('idle')}
                    className="mt-6 w-full py-3 px-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Make Another Investment
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePledgeSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Select Livestock Batch</label>
                    <select 
                      value={pledgeData.batchId}
                      onChange={(e) => setPledgeData({...pledgeData, batchId: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-berna-green text-slate-900 dark:text-white"
                    >
                      <option value="LB-802">Batch #LB-802 (Expected ROI: 22%)</option>
                      <option value="LB-803">Batch #LB-803 (Expected ROI: 25%)</option>
                      <option value="HF-101">Hydroponic Fodder Expansion (20%)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Investment Amount (USD)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                      <input 
                        type="number" 
                        min="50"
                        required
                        value={pledgeData.amount}
                        onChange={(e) => setPledgeData({...pledgeData, amount: e.target.value})}
                        className="w-full pl-8 pr-4 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-berna-green text-slate-900 dark:text-white font-mono"
                        placeholder="100.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Payment Method</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        type="button"
                        onClick={() => setPledgeData({...pledgeData, paymentMethod: 'zaad'})}
                        className={`py-3 rounded-xl border-2 transition-all font-bold ${pledgeData.paymentMethod === 'zaad' ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                      >
                        ZAAD Service
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPledgeData({...pledgeData, paymentMethod: 'edahab'})}
                        className={`py-3 rounded-xl border-2 transition-all font-bold ${pledgeData.paymentMethod === 'edahab' ? 'border-yellow-500 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                      >
                        e-Dahab
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Mobile Number</label>
                    <input 
                      type="tel" 
                      required
                      value={pledgeData.phoneNumber}
                      onChange={(e) => setPledgeData({...pledgeData, phoneNumber: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-berna-green text-slate-900 dark:text-white"
                      placeholder="252 63 448 2134"
                    />
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <AlertCircle className="w-5 h-5 text-berna-blue shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      By proceeding, you agree to the smart contract terms. Funds are securely locked in the project escrow until batch maturation.
                    </p>
                  </div>

                  <button 
                    type="submit"
                    disabled={paymentStatus === 'processing'}
                    className={`w-full py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${paymentStatus === 'processing' ? 'bg-slate-400 cursor-not-allowed' : 'bg-berna-green hover:bg-berna-green-dark shadow-berna-green/30'}`}
                  >
                    {paymentStatus === 'processing' ? (
                      <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Processing...</>
                    ) : (
                      <><Wallet className="w-5 h-5" /> Pledge Now</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Investment;
