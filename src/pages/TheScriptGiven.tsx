import React from 'react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { Container } from '../components/layout/Container';

export const TheScriptGiven = () => {
  const { setCurrentStep } = useStore();

  const handleNext = () => {
    setCurrentStep('time-has-value');
  };

  const handleBack = () => {
    setCurrentStep('landing');
  };

  return (
    <div className="min-h-screen bg-black text-white pt-safe-top pb-safe-bottom">
      <Container className="py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              The Script You Were Given
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 italic mb-8">
              "Study hard, go to college, get a job, save money, buy a house, have a family."
            </p>
            
            <p className="text-lg text-gray-400 mb-4">
              This step-by-step formula worked for previous generations. But something fundamental changed.
            </p>
            
            <p className="text-xl font-semibold text-red-400">
              Three of these steps are now financially impossible for most people:
            </p>
          </div>

          {/* Split Screen Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* 1980s - When It Worked */}
            <div className="bg-green-900/20 border border-green-600/30 rounded-xl p-6 lg:p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-green-400 mb-2">1980s</h2>
                <p className="text-green-300">The Script Worked</p>
              </div>

              <div className="space-y-8">
                {/* College */}
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4">College</h3>
                  <div className="bg-green-800/30 rounded-lg p-4">
                    <div className="text-3xl font-bold text-green-300 mb-2">22 hrs/week</div>
                    <p className="text-green-200 text-sm">Part-time job could pay for college</p>
                  </div>
                </div>

                {/* Housing */}
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4">Housing</h3>
                  <div className="bg-green-800/30 rounded-lg p-4">
                    <div className="text-3xl font-bold text-green-300 mb-2">3.5 years</div>
                    <p className="text-green-200 text-sm">One person working full-time</p>
                  </div>
                </div>

                {/* Family */}
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4">Family</h3>
                  <div className="bg-green-800/30 rounded-lg p-4">
                    <div className="text-3xl font-bold text-green-300 mb-2">29%</div>
                    <p className="text-green-200 text-sm">Normal rate - kids could launch</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2020s - When It Broke */}
            <div className="bg-red-900/20 border border-red-600/30 rounded-xl p-6 lg:p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-red-400 mb-2">2020s</h2>
                <p className="text-red-300">The Script Broke</p>
              </div>

              <div className="space-y-8">
                {/* College */}
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4">College</h3>
                  <div className="bg-red-800/30 rounded-lg p-4">
                    <div className="text-3xl font-bold text-red-300 mb-2">101 hrs/week</div>
                    <p className="text-red-200 text-sm">2.5 full-time jobs needed</p>
                  </div>
                </div>

                {/* Housing */}
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4">Housing</h3>
                  <div className="bg-red-800/30 rounded-lg p-4">
                    <div className="text-3xl font-bold text-red-300 mb-2">12.6 years</div>
                    <p className="text-red-200 text-sm">3.6x more hours required</p>
                  </div>
                </div>

                {/* Family */}
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4">Family</h3>
                  <div className="bg-red-800/30 rounded-lg p-4">
                    <div className="text-3xl font-bold text-red-300 mb-2">52%</div>
                    <p className="text-red-200 text-sm">Great Depression levels</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Message */}
          <div className="text-center mb-12">
            <div className="bg-gray-800/50 rounded-xl p-6 lg:p-8 border border-gray-600">
              <p className="text-2xl lg:text-3xl font-bold text-yellow-400 mb-4">
                The math changed. The script didn't.
              </p>
              <p className="text-lg text-gray-300">
                There aren't enough hours in the week to follow the same path your parents took.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Button 
              onClick={handleBack}
              variant="outline"
              className="order-2 sm:order-1"
            >
              ← Back
            </Button>
            <Button 
              onClick={handleNext}
              className="order-1 sm:order-2 flex-1 sm:flex-none sm:px-12"
            >
              Your Time Has Value →
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}; 