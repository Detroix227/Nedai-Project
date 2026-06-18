import { Link, Navigate } from 'react-router-dom';
import { Sparkles, BrainCircuit, CalendarDays, GraduationCap, ChevronRight, Sun, Moon, Download } from 'lucide-react';
import { useEffect } from 'react';
import { useAuthStore } from '@/modules/auth/useAuthStore';
import { useUIStore } from '@/modules/ui/useUIStore';

export default function IntroScreen() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { theme, toggleTheme } = useUIStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (isAuthenticated) {
    return <Navigate to="/chat" replace />;
  }

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 min-h-screen flex flex-col font-sans transition-colors duration-300">
      
      {/* Top Navbar */}
      <nav className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <img 
              src="nedai-text-logo.png" 
              alt="NedAI Logo" 
              className="w-12 sm:w-16 h-8 sm:h-10 object-contain"
            />
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">NedAI</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 sm:gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mr-1 sm:mr-2"
              title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === 'dark' ? (
                <Sun size={18} className="text-amber-500 sm:w-5 sm:h-5" strokeWidth={2.5} />
              ) : (
                <Moon size={18} className="text-slate-600 sm:w-5 sm:h-5" strokeWidth={2.5} />
              )}
            </button>
            
            <a 
              href="https://github.com/Detroix227/Nedai-Project/releases/download/v1.0.0/NedAI.Setup.1.0.0.exe" 
              download
              className="text-slate-600 dark:text-slate-300 font-semibold hover:text-slate-900 dark:hover:text-white transition px-2 sm:px-4 py-2 text-sm sm:text-base flex items-center gap-1.5"
            >
              <Download size={16} />
              <span>Download App</span>
            </a>
            <Link 
              to="/login" 
              className="text-slate-600 dark:text-slate-300 font-semibold hover:text-slate-900 dark:hover:text-white transition px-2 sm:px-4 py-2 text-sm sm:text-base"
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 sm:px-6 py-2 sm:py-2.5 rounded-full transition shadow-sm text-sm sm:text-base"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 sm:mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
              NedAI
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed mb-8 sm:mb-12 font-medium px-2 sm:px-0">
            Your personal AI-powered academic assistant. Automate your schedule, store your knowledge, and study smarter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/signup" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full flex items-center gap-2 transition transform hover:scale-105 shadow-xl text-base sm:text-lg"
            >
              Get Started for Free <ChevronRight size={18} className="sm:w-5 sm:h-5" strokeWidth={3} />
            </Link>
            <a 
              href="https://github.com/Detroix227/Nedai-Project/releases/download/v1.0.0/NedAI.Setup.1.0.0.exe" 
              download
              className="bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full flex items-center gap-2 transition transform hover:scale-105 border border-slate-700/50 shadow-xl text-base sm:text-lg"
            >
              <Download size={18} className="sm:w-5 sm:h-5" strokeWidth={3} /> Download for Windows
            </a>
          </div>
        </section>

        {/* Detailed Sections */}
        <section className="bg-white dark:bg-slate-900 py-16 sm:py-24 border-y border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 tracking-tight">Everything you need to succeed</h2>
              <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto px-2 sm:px-0">
                Powerful tools designed specifically for students and educators to save time and boost productivity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16">
              
              {/* Feature 1 */}
              <div className="flex flex-col">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 sm:mb-6 shadow-inner">
                  <BrainCircuit className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">Context-Aware AI Chat</h3>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Stop scrolling through hundreds of pages. Upload your lecture slides, notes, and textbooks, and let NedAI read them for you. Ask questions, request summaries, and get highly accurate answers grounded entirely in your own course materials. No more hallucinated facts.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4 sm:mb-6 shadow-inner">
                  <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">The Knowledge Vault</h3>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  A powerful, centralized storage system for your academic life. Keep all your PDFs, Word documents, and images organized in one place. NedAI automatically indexes everything you upload, making it instantly searchable and available for your AI chat sessions.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4 sm:mb-6 shadow-inner">
                  <CalendarDays className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">Automated Timetable</h3>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Managing your schedule has never been easier. View your classes in a beautiful calendar interface. Best of all, you can simply upload an image or document of your class schedule, and NedAI will use vision processing to automatically extract and populate your timetable.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 sm:mb-6 shadow-inner">
                  <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">Instant Generation</h3>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Prepare for exams with zero friction. Ask NedAI to generate multiple-choice quizzes, flashcards, and comprehensive study guides based on your specific curriculum. The AI adapts to your learning pace and focuses on the materials you provide.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="bg-slate-50 dark:bg-slate-950 py-20 sm:py-32 text-center px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 sm:mb-8 tracking-tight">Ready to upgrade your workflow?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
            <Link 
              to="/signup" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 sm:px-10 py-3.5 sm:py-4.5 rounded-full transition transform hover:scale-105 shadow-xl text-lg sm:text-xl"
            >
              Create Your Free Account
            </Link>
            <a 
              href="https://github.com/Detroix227/Nedai-Project/releases/download/v1.0.0/NedAI.Setup.1.0.0.exe" 
              download
              className="bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 font-bold px-8 sm:px-10 py-3.5 sm:py-4.5 rounded-full transition transform hover:scale-105 border border-slate-700/50 shadow-xl text-lg sm:text-xl"
            >
              <Download size={20} className="inline mr-2" /> Download Desktop App
            </a>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="w-full bg-slate-900 text-slate-400 py-8 text-center border-t border-slate-800">
          <p className="text-sm font-medium">© {new Date().getFullYear()} NedAI. All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
}
