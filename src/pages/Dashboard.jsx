import { useState } from 'react';
import { Thermometer, Droplets, Wind, Zap, Power, Video, Activity } from 'lucide-react';

const SmartCard = ({ title, value, unit, icon, status, trend }) => (
  <div className="glass p-6 rounded-2xl relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-2 h-full ${status === 'normal' ? 'bg-berna-green' : 'bg-amber-500'}`}></div>
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-berna-blue">
        {icon}
      </div>
      <span className={`text-sm font-semibold px-2 py-1 rounded-full ${trend > 0 ? 'bg-berna-green/20 text-berna-green' : 'bg-red-500/20 text-red-500'}`}>
        {trend > 0 ? '+' : ''}{trend}%
      </span>
    </div>
    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</h3>
    <div className="flex items-baseline gap-1">
      <span className="text-3xl font-bold text-slate-900 dark:text-white">{value}</span>
      <span className="text-slate-500 dark:text-slate-400 font-medium">{unit}</span>
    </div>
  </div>
);

const ToggleSwitch = ({ label, active, onToggle, icon }) => (
  <div className="glass p-5 rounded-2xl flex items-center justify-between transition-all">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${active ? 'bg-berna-blue text-white shadow-lg shadow-berna-blue/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
        {icon}
      </div>
      <span className="font-semibold text-slate-800 dark:text-white">{label}</span>
    </div>
    <button 
      onClick={onToggle}
      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${active ? 'bg-berna-green' : 'bg-slate-300 dark:bg-slate-600'}`}
    >
      <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${active ? 'translate-x-8' : 'translate-x-1'}`} />
    </button>
  </div>
);

const Dashboard = () => {
  const [controls, setControls] = useState({
    waterPump: true,
    ledLights: true,
    coolingFans: false
  });

  const toggleControl = (key) => {
    setControls(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="pt-24 pb-20 px-6 md:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
              IoT Command Center <Activity className="text-berna-green animate-pulse" />
            </h1>
            <p className="text-slate-600 dark:text-slate-400">Real-time monitoring and control of the Agro-Tech Complex.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-lg border-berna-green/30">
            <span className="w-2.5 h-2.5 rounded-full bg-berna-green animate-pulse"></span>
            <span className="text-sm font-semibold text-berna-green">System Online</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Sensors & Controls */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Sensor Grid */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Live Telemetry</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <SmartCard title="Temperature" value="24.5" unit="°C" icon={<Thermometer />} status="normal" trend={-1.2} />
                <SmartCard title="Humidity" value="68" unit="%" icon={<Wind />} status="normal" trend={0.5} />
                <SmartCard title="pH Level" value="6.2" unit="" icon={<Droplets />} status="warning" trend={0.1} />
                <SmartCard title="EC Level" value="1.8" unit="mS/cm" icon={<Zap />} status="normal" trend={-0.3} />
              </div>
            </div>

            {/* Hardware Controls */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Hardware Controls</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <ToggleSwitch 
                  label="Water Pump" 
                  active={controls.waterPump} 
                  onToggle={() => toggleControl('waterPump')}
                  icon={<Droplets className="w-5 h-5" />}
                />
                <ToggleSwitch 
                  label="LED Grow Lights" 
                  active={controls.ledLights} 
                  onToggle={() => toggleControl('ledLights')}
                  icon={<Power className="w-5 h-5" />}
                />
                <ToggleSwitch 
                  label="Cooling Fans" 
                  active={controls.coolingFans} 
                  onToggle={() => toggleControl('coolingFans')}
                  icon={<Wind className="w-5 h-5" />}
                />
              </div>
            </div>
            
          </div>

          {/* Right Column - Livestock Live Stream */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Video className="text-berna-blue" /> Livestock Monitoring
            </h2>
            <div className="glass rounded-2xl overflow-hidden shadow-lg border-slate-200 dark:border-slate-800 relative">
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-md text-white text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Live
              </div>
              <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-black/60 backdrop-blur-md rounded-md text-white text-xs font-mono">
                Cam: Pen B-12
              </div>
              
              {/* Video Placeholder */}
              <div className="aspect-video bg-slate-900 relative flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?auto=format&fit=crop&q=80&w=800" 
                  alt="Livestock Feed Placeholder" 
                  className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <div className="flex justify-between text-white mb-2">
                    <span className="text-sm font-medium">Batch ID: #LB-802</span>
                    <span className="text-sm font-medium text-berna-green">Status: Healthy</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-1.5 mt-2">
                    <div className="bg-berna-green h-1.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="text-xs text-white/70 mt-1">Daily Feed Intake Goal: 85%</div>
                </div>
              </div>
            </div>
            
            <div className="glass p-5 rounded-2xl mt-4 space-y-3">
              <h3 className="font-semibold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">Batch Stats</h3>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Current Weight Avg.</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">42.5 kg</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Fodder Intake</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">3.2 kg/day</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
