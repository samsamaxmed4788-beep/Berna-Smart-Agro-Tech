import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-24 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-berna-green/10 rounded-full blur-[100px] -z-10"></div>
      
      <div className="text-center z-10 glass p-12 md:p-20 rounded-[3rem] border border-white/20 dark:border-slate-800 shadow-2xl max-w-2xl w-full">
        <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-red-200 dark:border-red-800">
          <AlertTriangle className="w-12 h-12" />
        </div>
        
        <h1 className="text-6xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          404
        </h1>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">
          Page Not Found / Boggan Lama Helin
        </h2>
        
        <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed text-lg max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-berna-green text-white font-bold hover:bg-berna-green-dark hover:scale-105 transition-all shadow-lg shadow-berna-green/30">
          <Home className="w-5 h-5" /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
