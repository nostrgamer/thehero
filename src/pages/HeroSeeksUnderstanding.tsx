import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { Container } from '../components/layout/Container';

export const HeroSeeksUnderstanding = () => {
  const { setCurrentStep } = useStore();
  const [revealedSection, setRevealedSection] = useState<string>('');

  const handleNext = () => {
    setCurrentStep('same-rules');
  };

  const handleBack = () => {
    setCurrentStep('time-has-value');
  };

  const revealSection = (section: string) => {
    setRevealedSection(section);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-safe-top pb-safe-bottom">
      <Container className="py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              A Hero Seeks Understanding
            </h1>
            
            <p className="text-xl text-gray-300 mb-4">
              You've seen the impossible math. Now discover why.
            </p>
            
            <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
                             <p className="text-lg text-yellow-400 font-semibold mb-2">
                 "Cui bono?" - Who benefits? (Latin: "Who gains?")
               </p>
              <p className="text-gray-300">
                When something doesn't make sense, follow the money. Someone is getting rich while you get poorer.
              </p>
            </div>
          </div>

                    {/* The Great Theft Visualization */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">The Great Time Theft: Where Your Stolen Productivity Goes</h2>
            
            {/* Chart Area - Productivity vs Wages */}
            <div className="bg-gray-900/50 rounded-xl p-8 mb-8 border border-gray-600">
              <div className="relative h-80">
                
                {/* Y-axis */}
                <div className="absolute left-0 h-full flex flex-col justify-between text-sm text-gray-400">
                  <span>400</span>
                  <span>350</span>
                  <span>300</span>
                  <span>250</span>
                  <span>200</span>
                  <span>150</span>
                  <span>100</span>
                </div>
                
                {/* Chart area */}
                <div className="ml-12 h-full relative">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="border-t border-gray-700/30"></div>
                    ))}
                  </div>
                  
                  {/* X-axis labels */}
                  <div className="absolute -bottom-8 w-full flex justify-between text-xs sm:text-sm text-gray-400">
                    <span className="hidden sm:inline">1948</span>
                    <span className="sm:hidden">48</span>
                    <span className="hidden sm:inline">1961</span>
                    <span className="sm:hidden">61</span>
                    <span className="hidden sm:inline">1973</span>
                    <span className="sm:hidden">73</span>
                    <span className="hidden sm:inline">1985</span>
                    <span className="sm:hidden">85</span>
                    <span className="hidden sm:inline">1997</span>
                    <span className="sm:hidden">97</span>
                    <span className="hidden sm:inline">2009</span>
                    <span className="sm:hidden">09</span>
                    <span className="hidden sm:inline">2024</span>
                    <span className="sm:hidden">24</span>
                  </div>
                  
                  {/* The Lines */}
                  <svg className="absolute inset-0 w-full h-full">
                    {/* Hourly compensation (blue) - tracks with productivity until ~1973, then diverges */}
                    <polyline
                      points="0,320 50,300 100,280 120,260 140,250 160,245 180,240 200,235 220,230 240,225 260,220 280,215 300,210 320,205 340,200 360,195 380,190 400,185"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="4"
                    />
                    {/* Net productivity (orange) - continues rising after 1973 */}
                    <polyline
                      points="0,320 50,300 100,280 120,260 140,250 160,240 180,220 200,200 220,180 240,160 260,140 280,120 300,100 320,80 340,60 360,40 380,20 400,10"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="4"
                    />
                  </svg>
                </div>
              </div>
              
              {/* Clean Legend Below Chart */}
              <div className="flex justify-center space-x-8 mt-12">
                <div className="flex items-center">
                  <div className="w-6 h-1 bg-blue-500 mr-3"></div>
                  <span className="text-blue-400 font-medium">Hourly Compensation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-1 bg-orange-500 mr-3"></div>
                  <span className="text-orange-400 font-medium">Net Productivity</span>
                </div>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-blue-900/20 border border-blue-600/30 rounded-xl p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4">1948-1971: Fair Share</h3>
                  <div className="text-4xl font-bold text-blue-400 mb-2">Wages = Productivity</div>
                  <p className="text-blue-300">Workers got paid for what they produced</p>
                </div>
              </div>
              
              <div className="bg-red-900/20 border border-red-600/30 rounded-xl p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4">1971-2025: Theft</h3>
                  <div className="text-4xl font-bold text-red-400 mb-2">Wages ≠ Productivity</div>
                  <p className="text-red-300">Your extra productivity was stolen</p>
                </div>
              </div>
            </div>

            <div className="text-center mb-12">
              <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-xl p-6">
                <p className="text-2xl font-bold text-yellow-400 mb-2">
                  What happened?
                </p>
                <p className="text-lg text-yellow-300">
                  Money was no longer hard as we moved to a fiat standard.
                </p>
                <p className="text-base text-gray-300 mt-2">
                  You became 4x more productive, but your wages barely doubled. Where did the other 2x go?
                </p>
              </div>
            </div>
          </div>

          {/* The Revelation Sections */}
          <div className="space-y-8 mb-16">
            {/* Section 1: The Money Printer */}
            <div className="bg-gray-900/50 rounded-xl border border-gray-600">
              <button
                onClick={() => revealSection(revealedSection === 'printer' ? '' : 'printer')}
                className="w-full p-6 text-left hover:bg-gray-800/30 transition-colors rounded-xl"
              >
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                  The Money Printer Goes Brrr
                </h3>
                <p className="text-gray-300">
                  Click to reveal who controls the money supply →
                </p>
              </button>
              
              {revealedSection === 'printer' && (
                <div className="px-6 pb-6 border-t border-gray-700 pt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold mb-4 text-red-400">Before 1971: Gold Standard</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Money backed by gold</li>
                        <li>• Limited money supply</li>
                        <li>• Government couldn't print at will</li>
                        <li>• Your savings held value</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-4 text-red-400">After 1971: Fiat Money</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Money backed by nothing</li>
                        <li>• Unlimited money printing</li>
                        <li>• Government prints whenever needed</li>
                        <li>• Your savings lose value (inflation)</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 bg-red-900/30 rounded-lg p-4">
                    <p className="text-red-300 font-semibold">
                      Result: Every dollar printed makes your existing dollars worth less. 
                      Your time is being stolen through currency debasement.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Section 2: Who Benefits */}
            <div className="bg-gray-900/50 rounded-xl border border-gray-600">
              <button
                onClick={() => revealSection(revealedSection === 'benefits' ? '' : 'benefits')}
                className="w-full p-6 text-left hover:bg-gray-800/30 transition-colors rounded-xl"
              >
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                  Who Benefits From This System?
                </h3>
                <p className="text-gray-300">
                  Click to reveal who gets rich while you get poor →
                </p>
              </button>
              
              {revealedSection === 'benefits' && (
                <div className="px-6 pb-6 border-t border-gray-700 pt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-green-900/20 rounded-lg p-4">
                      <h4 className="text-lg font-semibold mb-3 text-green-400">Government</h4>
                      <ul className="space-y-1 text-sm text-green-300">
                        <li>• Prints money to fund spending</li>
                        <li>• Pays debts with devalued currency</li>
                        <li>• No need to raise unpopular taxes</li>
                      </ul>
                    </div>
                    <div className="bg-green-900/20 rounded-lg p-4">
                      <h4 className="text-lg font-semibold mb-3 text-green-400">Banks</h4>
                      <ul className="space-y-1 text-sm text-green-300">
                        <li>• Get newly printed money first</li>
                        <li>• Lend it out before inflation hits</li>
                        <li>• Profit from the "Cantillon Effect"</li>
                      </ul>
                    </div>
                    <div className="bg-green-900/20 rounded-lg p-4">
                      <h4 className="text-lg font-semibold mb-3 text-green-400">Asset Owners</h4>
                      <ul className="space-y-1 text-sm text-green-300">
                        <li>• Own stocks, real estate, bonds</li>
                        <li>• Assets inflate with money printing</li>
                        <li>• Get richer without working</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 bg-red-900/30 rounded-lg p-4">
                    <p className="text-red-300 font-semibold">
                      You: Hold cash, earn wages, pay rent. Your purchasing power decreases every year 
                      while asset owners get richer doing nothing.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: The Cantillon Effect */}
            <div className="bg-gray-900/50 rounded-xl border border-gray-600">
              <button
                onClick={() => revealSection(revealedSection === 'cantillon' ? '' : 'cantillon')}
                className="w-full p-6 text-left hover:bg-gray-800/30 transition-colors rounded-xl"
              >
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                  The Cantillon Effect: First Comes First Served
                </h3>
                <p className="text-gray-300">
                  Click to understand why proximity to the money printer matters →
                </p>
              </button>
              
              {revealedSection === 'cantillon' && (
                <div className="px-6 pb-6 border-t border-gray-700 pt-6">
                  <div className="space-y-6">
                                          <div className="bg-gradient-to-r from-green-900/30 to-red-900/30 rounded-lg p-6">
                        <h4 className="text-xl font-semibold mb-4 text-center">Money Flow Timeline</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                          <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-black font-bold mb-2 mx-auto">1</div>
                            <p className="text-sm text-green-400 font-semibold">Banks & Government</p>
                            <p className="text-xs text-green-300">Get new money first</p>
                          </div>
                          <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold mb-2 mx-auto">2</div>
                            <p className="text-sm text-yellow-400 font-semibold">Corporations</p>
                            <p className="text-xs text-yellow-300">Get cheap loans</p>
                          </div>
                          <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-black font-bold mb-2 mx-auto">3</div>
                            <p className="text-sm text-orange-400 font-semibold">Asset Markets</p>
                            <p className="text-xs text-orange-300">Prices inflate</p>
                          </div>
                          <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mb-2 mx-auto">4</div>
                            <p className="text-sm text-red-400 font-semibold">You</p>
                            <p className="text-xs text-red-300">Higher prices, same wages</p>
                          </div>
                        </div>
                      </div>
                    <div className="bg-red-900/30 rounded-lg p-4">
                      <p className="text-red-300 font-semibold">
                        By the time new money reaches you, prices have already risen. 
                        You're always last in line, always paying more for less.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* The Realization */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-red-900/30 to-yellow-900/30 rounded-xl p-8 border border-yellow-600/50">
              <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                The System Is Broken.
              </h2>
              <p className="text-xl text-gray-300 mb-4">
                It no longer serves the producers.
              </p>
              <p className="text-lg text-yellow-300">
                Your time is being systematically stolen.
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
              Same Rules for Everyone →
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}; 