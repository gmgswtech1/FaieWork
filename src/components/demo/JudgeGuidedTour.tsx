import React, { useState } from 'react';
import {
  Compass,
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Minimize2,
  Maximize2,
  ExternalLink,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

interface TourStep {
  step: number;
  title: string;
  role: 'public' | 'worker' | 'employer' | 'reviewer';
  route: string;
  tab?: string;
  description: string;
  actionHint: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    step: 1,
    title: 'Platform Vision & Brand',
    role: 'public',
    route: '#/',
    description:
      'AMANA addresses Ethiopia’s high-risk informal labor market with transparent job matching and digital worker protections.',
    actionHint: 'Explore the landing page, value props, and 6-language switcher.',
  },
  {
    step: 2,
    title: 'Public Trust Center',
    role: 'public',
    route: '#/trust',
    description:
      'Inspect the four independent verification badges, zero-knowledge Fayda architecture, and fair contract standards.',
    actionHint: 'Click on any badge to inspect verification metadata and demo hashes.',
  },
  {
    step: 3,
    title: 'Worker Verification Center',
    role: 'worker',
    route: '#/worker',
    tab: 'verification',
    description:
      'Worker Amina Kedir maintains verified National ID credentials and endorsed certifications for domestic placement.',
    actionHint: 'Observe the demo code AMN-DEMO-IDV-0001 and audit history log.',
  },
  {
    step: 4,
    title: 'Fayda eKYC Simulator',
    role: 'worker',
    route: '#/worker',
    tab: 'verification',
    description:
      'Experience the 4-step National ID simulation modal with zero-knowledge consent and judge-controlled outcomes.',
    actionHint: 'Click "Simulate Fayda eKYC" to test different verification outcomes.',
  },
  {
    step: 5,
    title: 'Transparent Job Discovery',
    role: 'worker',
    route: '#/worker',
    tab: 'jobs',
    description:
      'Discover vetted employment opportunities with explicit monthly compensation, schedules, and guaranteed rest days.',
    actionHint: 'Filter by domestic roles in Bole Atlas and inspect job expectations.',
  },
  {
    step: 6,
    title: 'Employer Application Review',
    role: 'employer',
    route: '#/employer',
    tab: 'applications',
    description:
      'Dr. Tewodros reviews applicant Amina Kedir with verified Fayda ID badge and cross-checked CPR qualification.',
    actionHint: 'Inspect the applicant card and status tracking.',
  },
  {
    step: 7,
    title: 'Digital Employment Agreement',
    role: 'employer',
    route: '#/employer',
    tab: 'agreements',
    description:
      'Formalize the employment contract with legally structured terms, ETB 8,500 monthly wage, and medical contingency.',
    actionHint: 'Open the Agreement preview modal to view the bilingual contract.',
  },
  {
    step: 8,
    title: 'Worker Contract Confirmation',
    role: 'worker',
    route: '#/worker',
    tab: 'agreements',
    description:
      'Amina reviews the exact contract terms on her mobile interface and confirms digital acceptance.',
    actionHint: 'Verify that mutual confirmation activates the contract.',
  },
  {
    step: 9,
    title: 'Salary & Payment Tracking',
    role: 'employer',
    route: '#/employer',
    tab: 'salary',
    description:
      'Record transparent salary payments via Telebirr or CBE Birr with receipt proof and timestamped logs.',
    actionHint: 'Record a demonstration salary transfer to update payment history.',
  },
  {
    step: 10,
    title: 'Confidential Workplace Protection',
    role: 'worker',
    route: '#/worker',
    tab: 'reports',
    description:
      'Workers report safety or wage violations confidentially. Employers have ZERO access to complaints or evidence.',
    actionHint: 'Inspect confidential case AMN-CASE-2026-001 and submit additional info.',
  },
  {
    step: 11,
    title: 'Reviewer Investigation & Audit',
    role: 'reviewer',
    route: '#/reviewer',
    tab: 'overview',
    description:
      'Senior Reviewer Sara Bekele investigates cases, adds confidential internal notes, and refers workers for support.',
    actionHint: 'Check the Reviewer Audit Desk to inspect cases and endorse badges.',
  },
];

interface JudgeGuidedTourProps {
  onNavigateRoute: (route: string) => void;
  onSetWorkerTab: (tab: string) => void;
  onSetEmployerTab: (tab: string) => void;
  onSetReviewerTab: (tab: string) => void;
}

export const JudgeGuidedTour: React.FC<JudgeGuidedTourProps> = ({
  onNavigateRoute,
  onSetWorkerTab,
  onSetEmployerTab,
  onSetReviewerTab,
}) => {
  const { switchRole, resetDemoData } = usePlatform();
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const currentStep = TOUR_STEPS[currentStepIndex];

  const handleJumpToStep = (index: number) => {
    setCurrentStepIndex(index);
    const target = TOUR_STEPS[index];

    // Apply role and routing
    if (target.role === 'worker') {
      switchRole('worker');
      onNavigateRoute('#/worker');
      if (target.tab) onSetWorkerTab(target.tab);
    } else if (target.role === 'employer') {
      switchRole('employer');
      onNavigateRoute('#/employer');
      if (target.tab) onSetEmployerTab(target.tab);
    } else if (target.role === 'reviewer') {
      switchRole('reviewer');
      onNavigateRoute('#/reviewer');
      if (target.tab) onSetReviewerTab(target.tab);
    } else {
      onNavigateRoute(target.route);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      handleJumpToStep(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      handleJumpToStep(currentStepIndex - 1);
    }
  };

  return (
    <aside aria-label="Hackathon Judge Guided Tour" className="fixed bottom-4 left-4 z-40 max-w-sm w-[calc(100vw-2rem)] sm:w-96 select-none font-sans">
      {/* Floating launcher pill when closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-slate-900 border border-emerald-500/40 text-white px-4 py-2.5 shadow-2xl hover:bg-slate-800 transition flex items-center gap-2.5 group cursor-pointer animate-in fade-in"
        >
          <div className="h-7 w-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition">
            <Compass size={16} />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Judge Guided Tour</span>
              <span className="rounded-full bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 text-[9px] font-bold">
                11 Steps
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Click to explore end-to-end prototype</p>
          </div>
        </button>
      )}

      {/* Expanded Tour Dock */}
      {isOpen && (
        <div className="rounded-3xl bg-slate-900 text-white shadow-2xl border border-emerald-500/30 overflow-hidden animate-in slide-in-from-bottom-3">
          {/* Top Header */}
          <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass size={18} className="text-emerald-400" />
              <span className="text-xs font-black font-display text-white">
                Hackathon Tour • Step {currentStep.step} of 11
              </span>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:text-white rounded-lg hover:bg-slate-800 transition"
                title={isMinimized ? 'Expand tour card' : 'Minimize tour card'}
              >
                {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:text-white rounded-lg hover:bg-slate-800 transition"
                title="Close tour"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <div className="p-5 space-y-4">
              {/* Step Title & Role Badge */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black font-display text-white">
                    {currentStep.title}
                  </h4>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      currentStep.role === 'worker'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : currentStep.role === 'employer'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : currentStep.role === 'reviewer'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    Role: {currentStep.role}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentStep.description}
                </p>
              </div>

              {/* Action Hint Box */}
              <div className="rounded-2xl bg-emerald-950/40 border border-emerald-500/20 p-3 text-xs text-emerald-200/90 flex items-start gap-2">
                <Sparkles size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{currentStep.actionHint}</span>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrev}
                    disabled={currentStepIndex === 0}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white transition"
                    title="Previous step"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentStepIndex === TOUR_STEPS.length - 1}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white transition"
                    title="Next step"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                <button
                  onClick={() => handleJumpToStep(currentStepIndex)}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Auto-Navigate</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Step indicator dots */}
              <div className="flex items-center justify-center gap-1 pt-2 border-t border-slate-800">
                {TOUR_STEPS.map((s, idx) => (
                  <button
                    key={s.step}
                    onClick={() => handleJumpToStep(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentStepIndex
                        ? 'w-5 bg-emerald-400'
                        : 'w-2 bg-slate-700 hover:bg-slate-500'
                    }`}
                    title={`Step ${s.step}: ${s.title}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};
