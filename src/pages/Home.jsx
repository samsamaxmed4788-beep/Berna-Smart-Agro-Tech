import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplets, Sprout, Cpu, Activity, ShieldCheck, TrendingUp, Sun, ChevronRight } from 'lucide-react';

const FeatureCard = ({ icon, titleEn, titleSo, descEn, descSo, delay }) => (
  <div 
    className={`glass p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-3 transition-all duration-500 animate-fade-in-up border border-white/20 dark:border-white/10 hover:shadow-2xl hover:shadow-berna-green/20 hover:border-berna-green/40`} 
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Animated background glow on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-berna-green/5 to-berna-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="absolute -top-24 -right-24 w-48 h-48 bg-berna-green/20 rounded-full blur-3xl group-hover:bg-berna-green/30 transition-all duration-500"></div>
    
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 shadow-inner flex items-center justify-center text-berna-blue mb-8 group-hover:scale-110 transition-transform duration-500 border border-white/50 dark:border-slate-700">
      {icon}
    </div>
    
    <div className="relative z-10">
      <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-gradient transition-colors">
        {titleEn}
      </h3>
      <h4 className="text-sm font-semibold text-berna-green mb-5 border-b border-slate-200 dark:border-slate-800 pb-3">
        {titleSo}
      </h4>
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
        {descEn}
      </p>
      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
        <p className="text-slate-500 dark:text-slate-500 text-sm italic font-serif">
          "{descSo}"
        </p>
      </div>
    </div>
  </div>
);

const Home = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-berna-green selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 md:px-12 overflow-hidden min-h-[90vh] flex items-center">
        {/* Dynamic Background */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-berna-green/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-berna-blue/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="absolute top-0 right-0 -z-10 w-full md:w-3/4 h-full opacity-10 dark:opacity-[0.03] pointer-events-none">
          <div className="w-full h-full" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%232E7D32\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass border border-berna-green/30 text-slate-800 dark:text-slate-200 text-sm font-semibold shadow-lg backdrop-blur-xl">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-berna-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-berna-green"></span>
              </span>
              Somaliland's First Smart Agro-Tech Complex
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] text-slate-900 dark:text-white tracking-tight">
              Connecting Tech <br/>
              with the <span className="text-gradient relative inline-block">
                Future of Food
                <svg className="absolute w-full h-4 -bottom-1 left-0 text-berna-green/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none"/></svg>
              </span>
            </h1>
            
            <div className="pl-6 border-l-4 border-berna-green">
              <h2 className="text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-300">
                Isku-xirka tignoolajiyada iyo mustaqbalka sugnaanta cuntada Soomaalilaan.
              </h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              Tackling Hargeisa's water scarcity through AI-driven hydroponics and drought resistance through 7-day automated fodder production.
              <br/><br/>
              <span className="italic text-slate-500 font-serif">La-tacaalida biyo-yarida Hargeysa iyadoo la adeegsanayo habka haaydaroboonigis-ka iyo adkeysiga abaaraha oo lagu xallinayo calafka 7-da cisho ah.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 pt-6">
              <Link to="/invest" className="group relative px-8 py-4 rounded-2xl bg-berna-green text-white font-bold transition-all hover:shadow-[0_0_40px_-10px_rgba(46,125,50,0.8)] overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <span className="relative flex items-center justify-center gap-2">
                  Invest Now / Maalgelin <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link to="/dashboard" className="group px-8 py-4 rounded-2xl glass text-slate-800 dark:text-white font-bold hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 hover:border-berna-blue/50">
                Live Dashboard <Activity className="w-5 h-5 group-hover:rotate-12 transition-transform text-berna-blue" />
              </Link>
            </div>
          </div>
          
          {/* Holographic Graphic Representation */}
          <div className="relative w-full aspect-square lg:aspect-auto lg:h-[600px] flex items-center justify-center perspective-1000">
            {/* Glowing orb behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-berna-green to-berna-blue rounded-full blur-[100px] opacity-20 dark:opacity-40 animate-pulse"></div>
            
            <div className="relative w-full h-full max-h-[550px] rounded-[2.5rem] overflow-hidden glass border-2 border-white/50 dark:border-white/10 shadow-2xl shadow-berna-blue/20 transform transition-transform duration-700 hover:rotate-y-6 hover:rotate-x-6">
              <img 
                src="https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=1200" 
                alt="Modern Smart Greenhouse" 
                className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-1000"
              />
              
              {/* Hologram Overlay Elements */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-berna-blue/10 mix-blend-color"></div>
              
              {/* Floating Tech Badges */}
              <div className="absolute top-6 left-6 glass px-5 py-3 rounded-2xl flex items-center gap-4 backdrop-blur-xl bg-white/10 border-white/20 shadow-xl transform hover:scale-105 transition-transform cursor-default">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/50">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                </div>
                <div>
                  <div className="text-xs font-bold text-white/70 uppercase tracking-wider">Internal Temp</div>
                  <div className="text-2xl font-mono text-white font-bold drop-shadow-md">24.5°C</div>
                </div>
              </div>
              
              <div className="absolute bottom-8 right-6 glass px-5 py-3 rounded-2xl flex items-center gap-4 backdrop-blur-xl bg-white/10 border-white/20 shadow-xl transform hover:scale-105 transition-transform cursor-default">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/50">
                  <Droplets className="text-blue-400 w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white/70 uppercase tracking-wider">Water Recycled</div>
                  <div className="text-2xl font-mono text-white font-bold drop-shadow-md">98.2%</div>
                </div>
              </div>

              <div className="absolute top-1/2 right-6 transform -translate-y-1/2 glass p-3 rounded-full backdrop-blur-xl bg-white/10 border-white/20 shadow-xl">
                <Sun className="text-yellow-400 w-6 h-6 animate-[spin_10s_linear_infinite]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hydroponic Fodder Highlight Section */}
      <section className="px-6 md:px-12 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900/50 -z-20"></div>
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-berna-green/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="order-2 lg:order-1 relative w-full aspect-square md:aspect-[4/3] lg:aspect-square group">
              <div className="absolute inset-0 bg-gradient-to-tr from-berna-green to-berna-blue rounded-[3rem] transform -rotate-3 scale-105 opacity-20 group-hover:rotate-0 group-hover:scale-100 transition-all duration-700"></div>
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl z-10">
                <img 
                  src="https://farmboxfoods.com/wp-content/uploads/elementor/thumbs/Fodder-trays-copy-puraslt7z4izemdni5vfvxxyjg7t7d50ttyfqqi3s0.jpg" 
                  alt="Hydroponic Fresh Fodder" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1530836369250-ef71a3b5e4cf?auto=format&fit=crop&q=80&w=1200";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                
                {/* Floating Cards */}
                <div className="absolute bottom-8 left-8 glass px-6 py-4 rounded-2xl border-white/20 shadow-xl backdrop-blur-xl animate-fade-in-up delay-100">
                  <div className="text-sm font-bold text-berna-green uppercase tracking-wider mb-1">Growth Time</div>
                  <div className="text-3xl font-extrabold text-white">7 Days</div>
                </div>
                
                <div className="absolute top-8 right-8 glass px-6 py-4 rounded-2xl border-white/20 shadow-xl backdrop-blur-xl animate-fade-in-up delay-300">
                  <div className="text-sm font-bold text-berna-blue uppercase tracking-wider mb-1">Water Saved</div>
                  <div className="text-3xl font-extrabold text-white">95%</div>
                </div>
              </div>
            </div>

            {/* Text Side */}
            <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-berna-green/10 text-berna-green font-bold text-sm tracking-wider">
                <Sprout className="w-5 h-5" /> REVOLUTIONARY FEED
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                The <span className="text-gradient">7-Day</span> Hydroponic Fodder Miracle
              </h2>
              
              <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  Say goodbye to the devastating effects of droughts. Our state-of-the-art hydroponic systems produce highly nutritious, fresh green fodder from seed to feed in just exactly 7 days.
                </p>
                <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border-l-4 border-berna-green shadow-sm">
                  <p className="italic font-serif text-slate-700 dark:text-slate-300">
                    "Toddoba maalmood gudahood ayaan soo saarnaa calaf cagaaran oo nafaqo badan, kaas oo ah xalka rasmiga ah ee abaaraha iyo cunto-yarida xoolaha Somaliland."
                  </p>
                </div>
                <ul className="space-y-4 pt-4">
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-berna-green shrink-0 mt-1">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 dark:text-white">Drought Independent</strong>
                      Grown entirely indoors in a climate-controlled AI environment.
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-berna-blue shrink-0 mt-1">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 dark:text-white">High Nutritional Value</strong>
                      Packed with vitamins, enzymes, and proteins essential for rapid livestock fattening.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Teaser Section */}
      <section className="px-6 md:px-12 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-[3rem] p-8 md:p-12 border border-white/20 dark:border-slate-800 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-berna-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="grid md:grid-cols-5 gap-10 items-center relative z-10">
              <div className="md:col-span-2 relative">
                <div className="absolute inset-0 bg-berna-green rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                <img 
                  src="/founder.jpg" 
                  alt="Eng A/fatah A/rahim Berna" 
                  className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-2xl mx-auto transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400";
                  }}
                />
              </div>
              
              <div className="md:col-span-3 text-center md:text-left space-y-5">
                <div className="inline-block px-4 py-1.5 rounded-full bg-berna-blue/10 text-berna-blue text-sm font-bold tracking-wider">
                  THE VISIONARY
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                  Eng. A/fatah A/rahim Berna
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  "Tignoolajiyadu maaha kaliya in lagu horumariyo qalabka, waa inay xal u noqotaa caqabadaha aasaasiga ah ee ina haysta sida biyo-yarida iyo abaaraha. Beeralayda casriga ah waa wadada kaliya ee aan ku sugi karno mustaqbalka dhalaalaya ee dalkeena."
                </p>
                <Link to="/about" className="inline-flex items-center gap-2 text-berna-green font-bold hover:text-berna-blue transition-colors group/link mt-2">
                  Read Full Story <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 md:px-12 py-32 relative">
        <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900/80 -z-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-berna-blue/5 via-transparent to-transparent -z-10"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block py-1 px-3 rounded-full bg-berna-blue/10 text-berna-blue font-semibold text-sm mb-4 border border-berna-blue/20">Our Technology</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white tracking-tight">Smart Farming Ecosystem</h2>
            <p className="text-berna-green font-semibold text-lg mb-6 border-b-2 border-berna-green/20 inline-block pb-2">Nidaamka Beeralayda Casriga ah</p>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Our vertically integrated facility utilizes cutting-edge IoT and AI to maximize yield while minimizing resource consumption by up to 95% compared to traditional farming.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            <FeatureCard 
              icon={<Cpu className="w-8 h-8" />}
              titleEn="AI-Driven Hydroponics"
              titleSo="Haaydaroboonigis AI"
              descEn="Automated nutrient delivery and climate control for maximum crop yield in controlled environments."
              descSo="Nidaam otomaatig ah oo nafaqada iyo cimilada xakameeya si loo helo wax soo saar tayo sare leh."
              delay={0}
            />
            <FeatureCard 
              icon={<Sprout className="w-8 h-8" />}
              titleEn="7-Day Fodder"
              titleSo="Calaf Otomaatig ah"
              descEn="Hydroponic fodder production system producing fresh, nutritious feed in just one week, drought-independent."
              descSo="Nidaam soo saara calaf cusub oo nafaqo leh mudo todobaad ah, iyadoo aan loo eegin abaaraha."
              delay={150}
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8" />}
              titleEn="IoT Livestock Tracking"
              titleSo="Xoolo-naaxin casri ah"
              descEn="Precision livestock fattening with real-time tracking of weight, feed intake, and health metrics."
              descSo="Nidaam xoolo-naaxin casri ah oo lagula socdo miisaanka, calafka, iyo caafimaadka waqti kasta."
              delay={300}
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="px-6 md:px-12 py-32 relative overflow-hidden flex items-center justify-center min-h-[60vh]">
        <div className="absolute inset-0 bg-gradient-to-br from-berna-green to-slate-900 -z-20"></div>
        <img src="https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=1600" alt="Agriculture background" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay -z-10 opacity-20" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50 opacity-80 -z-10"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 glass !bg-white/5 !border-white/10 !shadow-2xl p-10 md:p-16 rounded-[3rem] backdrop-blur-2xl">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-tight">Join the Revolution</h2>
          <p className="text-2xl md:text-3xl font-light text-berna-green mb-8 italic font-serif drop-shadow-md">
            "Ku soo biir kacaanka beeralayda casriga ah."
          </p>
          <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Become a part of the solution. Invest in sustainable, high-yield agriculture that secures our future and offers transparent, tech-driven ROI.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/invest" className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-white text-slate-900 font-bold text-lg hover:bg-berna-green hover:text-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              Start Investing <ChevronRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
