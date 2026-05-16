import { useEffect } from 'react';
import { Target, Lightbulb, Users, ArrowRight, Award } from 'lucide-react';

const About = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20 selection:bg-berna-green selection:text-white overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-berna-green/10 rounded-full blur-[120px] -z-10 mix-blend-multiply dark:mix-blend-screen animate-[pulse_6s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-berna-blue/10 rounded-full blur-[150px] -z-10 mix-blend-multiply dark:mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 relative">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 animate-fade-in-up">
            Our <span className="text-gradient">Vision</span>
          </h1>
          <p className="text-xl text-berna-green font-medium mb-6 italic border-b border-berna-green/20 pb-4 inline-block animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Himiladayada & Hadafkayaga
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            We are redefining the future of agriculture in Somaliland. By blending advanced IoT, AI, and hydroponic systems, we are overcoming climate challenges to ensure sustainable food security for generations to come.
          </p>
        </div>

        {/* Founder Section */}
        <div className="glass rounded-[3rem] p-8 md:p-12 border border-white/20 dark:border-slate-800 shadow-2xl relative overflow-hidden mb-24">
          <div className="absolute inset-0 bg-gradient-to-br from-berna-green/5 via-transparent to-berna-blue/5"></div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Founder Image & Decoration */}
            <div className="relative group animate-fade-in-left">
              <div className="absolute inset-0 bg-gradient-to-tr from-berna-green to-berna-blue rounded-[2.5rem] transform rotate-6 scale-105 opacity-20 group-hover:rotate-12 group-hover:scale-110 transition-all duration-700"></div>
              <div className="relative aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl z-10">
                <img 
                  src="/founder.jpg" 
                  alt="Eng A/fatah A/rahim Berna" 
                  className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800";
                  }}
                />
                
                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 glass px-5 py-3 rounded-2xl flex items-center gap-3 backdrop-blur-xl border border-white/30 shadow-2xl translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <Award className="text-berna-green w-8 h-8" />
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">Founder & CEO</div>
                    <div className="text-sm font-bold text-berna-green">Berna Tech</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Founder Bio */}
            <div className="space-y-6 animate-fade-in-right">
              <div className="inline-block px-4 py-2 rounded-full bg-berna-green/10 text-berna-green text-sm font-bold tracking-wider mb-2">
                MEET THE INNOVATOR
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">
                Eng. A/fatah A/rahim Berna
              </h2>
              <h3 className="text-xl text-berna-blue font-medium border-b border-slate-200 dark:border-slate-800 pb-4">
                Visionary Leader & Tech Entrepreneur
              </h3>
              
              <div className="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-400">
                <p>
                  As an engineer and visionary from Somaliland, Eng. A/fatah A/rahim Berna recognized the critical need to bridge the gap between traditional farming and modern technology. Driven by the devastating impacts of recurring droughts and water scarcity in Hargeisa, he founded the <strong>Berna Smart Agro-Tech Complex</strong>.
                </p>
                <p>
                  His mission is clear: to leverage Artificial Intelligence, IoT, and hydroponics to create a drought-resistant, highly efficient agricultural ecosystem. Under his leadership, Berna Tech is not just a farm—it's a technological revolution aimed at empowering local communities and securing the nation's food supply.
                </p>
                <blockquote className="border-l-4 border-berna-green pl-4 italic my-6 text-slate-700 dark:text-slate-300 font-serif">
                  "Tignoolajiyadu maaha kaliya in lagu horumariyo qalabka, waa inay xal u noqotaa caqabadaha aasaasiga ah ee ina haysta sida biyo-yarida iyo abaaraha. Beeralayda casriga ah waa wadada kaliya ee aan ku sugi karno mustaqbalka dhalaalaya ee dalkeena."
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="glass p-8 rounded-3xl group hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-berna-blue rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Lightbulb className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Innovation (Hal-abuur)</h3>
            <p className="text-slate-600 dark:text-slate-400">Pushing boundaries with AI and IoT to create solutions that perfectly adapt to our arid climate.</p>
          </div>
          
          <div className="glass p-8 rounded-3xl group hover:-translate-y-2 transition-all duration-300" style={{ animationDelay: '150ms' }}>
            <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 text-berna-green rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Sustainability (Waarid)</h3>
            <p className="text-slate-600 dark:text-slate-400">Recycling 98% of water and using renewable energy to ensure a zero-waste, eco-friendly future.</p>
          </div>
          
          <div className="glass p-8 rounded-3xl group hover:-translate-y-2 transition-all duration-300" style={{ animationDelay: '300ms' }}>
            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Community (Bulshada)</h3>
            <p className="text-slate-600 dark:text-slate-400">Empowering local farmers and investors by creating a transparent, highly profitable agricultural platform.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
