import { useState } from 'react';
import { X, Star, CheckCircle2, MessageSquare } from 'lucide-react';

const FeedbackModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle, submitting, success

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return; // Require at least a rating

    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onClose();
        // Reset after close
        setTimeout(() => {
          setStatus('idle');
          setRating(0);
          setName('');
          setMessage('');
        }, 500);
      }, 2500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in-up">
      <div className="relative w-full max-w-md glass bg-white/90 dark:bg-slate-800/90 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 dark:border-slate-700">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        >
          <X className="w-5 h-5 text-slate-700 dark:text-slate-300" />
        </button>

        <div className="p-8">
          {status === 'success' ? (
            <div className="text-center py-8 animate-fade-in-up">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-berna-green rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Thank You!</h3>
              <p className="text-slate-600 dark:text-slate-400">Waad ku mahadsantahay fikraddaada. Aad bay muhiim noogu tahay!</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-berna-blue/10 text-berna-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Leave Feedback</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Fikraddaadu waa noo muhiim. Sideed u aragtaa adeegayaga?</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Star Rating */}
                <div className="flex justify-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star 
                        className={`w-8 h-8 ${
                          star <= (hoveredRating || rating) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-slate-300 dark:text-slate-600'
                        } transition-colors`} 
                      />
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Magacaaga (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="Geli magacaaga"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-berna-green dark:text-white transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Fikraddaada</label>
                    <textarea 
                      required
                      placeholder="Maxay kula tahay adeegani?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-berna-green dark:text-white transition-all resize-none"
                    ></textarea>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={rating === 0 || status === 'submitting'}
                  className="w-full py-4 rounded-xl font-bold text-white bg-berna-green hover:bg-berna-green-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-lg shadow-berna-green/30"
                >
                  {status === 'submitting' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>Submit Feedback</>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
