import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, BrainCircuit, CalendarDays, GraduationCap } from 'lucide-react';

export default function IntroScreen() {
  return (
    <div className="flex-1 bg-white min-h-screen flex flex-col font-sans">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-12 flex flex-col items-center">
          
          {/* Logo & Header */}
          <div className="mb-6 h-24 w-24 flex items-center justify-center bg-blue-50 rounded-full shadow-sm">
            <img 
              src="/nedai-logo.png" 
              alt="NedAI Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 text-center tracking-tight mb-4">
            Welcome to <span className="text-blue-600">NedAI</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 text-center mb-12 max-w-lg">
            Your personal AI-powered academic assistant. Upload materials, manage your schedule, and chat with your coursework.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-14">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <BrainCircuit className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Smart Chat</h3>
              <p className="text-slate-500 text-sm">Ask questions and get instant, grounded answers from your uploaded documents.</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
              <div className="bg-emerald-100 p-3 rounded-full mb-4">
                <GraduationCap className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Knowledge Vault</h3>
              <p className="text-slate-500 text-sm">A centralized, searchable library for all your PDFs, lecture notes, and study materials.</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
              <div className="bg-amber-100 p-3 rounded-full mb-4">
                <CalendarDays className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">AI Timetable</h3>
              <p className="text-slate-500 text-sm">Automatically parse your schedule and stay on top of your classes and deadlines.</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
              <div className="bg-purple-100 p-3 rounded-full mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Instant Insights</h3>
              <p className="text-slate-500 text-sm">Generates quizzes, summaries, and personalized study guides on demand.</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row w-full gap-4 max-w-md justify-center">
            <Link 
              to="/signup" 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold h-14 rounded-xl flex items-center justify-center transition-colors shadow-sm"
            >
              Get Started
            </Link>
            <Link 
              to="/login" 
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold h-14 rounded-xl flex items-center justify-center transition-colors shadow-sm"
            >
              Sign In
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
