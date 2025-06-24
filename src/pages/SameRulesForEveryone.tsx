import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { Container } from '../components/layout/Container';

export const SameRulesForEveryone = () => {
  const { setCurrentStep } = useStore();
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>('2000');

  const handleNext = () => {
    setCurrentStep('hero-triumph');
  };

  const handleBack = () => {
    setCurrentStep('seek-understanding');
  };

  const calculateSavings = () => {
    const monthlyExpense = parseFloat(monthlyExpenses) || 0;
    const inflationRate = 0.10; // 10% inflation (fiat debasement)
    const bitcoinAppreciation = 0.35; // 35% per year (historical power law average)
    const netBitcoinAdvantage = bitcoinAppreciation - inflationRate; // 25% net advantage
    const years = 10;
    
    // Fiat: monthly expenses grow with inflation over 10 years
    const futureMonthlyExpensesFiat = monthlyExpense * Math.pow(1 + inflationRate, years);
    
    // Hard money: expenses get cheaper due to purchasing power increase
    const hardMoneyPurchasingPowerMultiplier = Math.pow(1 + netBitcoinAdvantage, years); // ~9.3x purchasing power
    const futureMonthlyExpensesHard = monthlyExpense / hardMoneyPurchasingPowerMultiplier;
    
    // Savings = what you would have spent in fiat minus what you actually spend in hard money
    const monthlySavings = futureMonthlyExpensesFiat - futureMonthlyExpensesHard;
    
    return {
      currentMonthly: monthlyExpense,
      futureExpensesFiat: Math.round(futureMonthlyExpensesFiat),
      futureExpensesHard: Math.round(futureMonthlyExpensesHard),
      totalSavings: Math.round(monthlySavings),
      savingsPercentage: Math.round(((monthlySavings / futureMonthlyExpensesFiat) * 100))
    };
  };

  const savings = calculateSavings();

  return (
    <div className="min-h-screen bg-black text-white pt-safe-top pb-safe-bottom">
      <Container className="py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Same Rules for Everyone
            </h1>
            
            <p className="text-xl text-gray-300 mb-4">
              What if money couldn't be printed? What if everyone played by the same rules?
            </p>
            
            <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
              <p className="text-lg text-yellow-400 font-semibold mb-2">
                Hard Money: The Great Equalizer
              </p>
              <p className="text-gray-300">
                When money can't be printed, nobody gets special privileges. Your purchasing power grows instead of shrinks.
              </p>
            </div>
          </div>

          {/* Calculator Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Savings Power of Hard Money</h2>
            
            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-600">
              <div className="text-center mb-8">
                <p className="text-xl text-gray-300 mb-6">
                  What if your expenses got cheaper every year instead of more expensive?
                </p>
                
                <div className="max-w-md mx-auto">
                  <label className="block text-lg font-medium text-gray-300 mb-4">
                    Your Monthly Expenses (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">$</span>
                    <input
                      type="number"
                      value={monthlyExpenses}
                      onChange={(e) => setMonthlyExpenses(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-12 py-4 text-white text-xl text-center"
                      placeholder="2000"
                    />
                  </div>
                </div>
              </div>

              {/* Comparison Visualization */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
                {/* Fiat Standard */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-red-400 mb-6">Fiat Standard (10 Years)</h3>
                  
                  {/* Visual Bar */}
                  <div className="relative bg-gray-800 rounded-lg p-6 mb-6">
                    <div className="h-32 bg-red-500 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="text-white font-bold text-lg z-10">
                        ${savings.futureExpensesFiat.toLocaleString()}/month
                      </div>
                      {/* Inflation arrows */}
                      <div className="absolute top-2 right-2 text-red-200">📈</div>
                    </div>
                    <p className="text-red-300 mt-3 font-semibold">
                      Your monthly expenses INFLATE
                    </p>
                    <p className="text-red-200 text-sm">
                      Everything gets more expensive every year
                    </p>
                  </div>
                </div>

                {/* Hard Money Standard */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-400 mb-6">Hard Money Standard (10 Years)</h3>
                  
                  {/* Visual Bar */}
                  <div className="relative bg-gray-800 rounded-lg p-6 mb-6">
                    <div className="h-32 bg-green-500 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="text-white font-bold text-lg z-10">
                        ${savings.futureExpensesHard.toLocaleString()}/month
                      </div>
                      {/* Deflation arrows */}
                      <div className="absolute top-2 right-2 text-green-200">📉</div>
                    </div>
                    <p className="text-green-300 mt-3 font-semibold">
                      Your monthly expenses DEFLATE
                    </p>
                    <p className="text-green-200 text-sm">
                      Everything gets cheaper as productivity improves
                    </p>
                  </div>
                </div>
              </div>

              {/* Massive Savings Display */}
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-900/30 to-yellow-900/30 rounded-xl p-8 border border-yellow-600/50">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                    Your Monthly Hard Money Savings
                  </h3>
                  <div className="text-6xl font-bold text-green-400 mb-4">
                    ${savings.totalSavings.toLocaleString()}/month
                  </div>
                  <p className="text-xl text-yellow-300 mb-2">
                    {savings.savingsPercentage}% less per month
                  </p>
                  <p className="text-lg text-gray-300">
                    This is what happens when money can't be printed to steal your purchasing power
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* The Rules Comparison */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Two Different Sets of Rules</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Fiat Rules */}
              <div className="bg-red-900/20 border border-red-600/30 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-red-400 mb-6 text-center">Fiat Rules</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-red-400 mr-3">❌</span>
                    <div>
                      <p className="font-semibold text-red-300">Money can be printed</p>
                      <p className="text-red-200 text-sm">Central banks create money from nothing</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-400 mr-3">❌</span>
                    <div>
                      <p className="font-semibold text-red-300">Different rules for different people</p>
                      <p className="text-red-200 text-sm">Banks get new money first, you get it last</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-400 mr-3">❌</span>
                    <div>
                      <p className="font-semibold text-red-300">Your purchasing power decreases</p>
                      <p className="text-red-200 text-sm">Inflation steals your savings every year</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-400 mr-3">❌</span>
                    <div>
                      <p className="font-semibold text-red-300">Productivity gains stolen</p>
                      <p className="text-red-200 text-sm">You work harder but don't get richer</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hard Money Rules */}
              <div className="bg-green-900/20 border border-green-600/30 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-green-400 mb-6 text-center">Hard Money Rules</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3">✅</span>
                    <div>
                      <p className="font-semibold text-green-300">Money cannot be printed</p>
                      <p className="text-green-200 text-sm">Fixed supply that nobody can manipulate</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3">✅</span>
                    <div>
                      <p className="font-semibold text-green-300">Same rules for everyone</p>
                      <p className="text-green-200 text-sm">No special privileges, no Cantillon Effect</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3">✅</span>
                    <div>
                      <p className="font-semibold text-green-300">Your purchasing power increases</p>
                      <p className="text-green-200 text-sm">Deflation makes everything cheaper over time</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3">✅</span>
                    <div>
                      <p className="font-semibold text-green-300">You keep productivity gains</p>
                      <p className="text-green-200 text-sm">Technology makes your life better, not just richer people's lives</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* The Revelation */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-yellow-900/30 to-green-900/30 rounded-xl p-8 border border-yellow-600/50">
              <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                This Hard Money Already Exists
              </h2>
              <p className="text-xl text-gray-300 mb-4">
                There's a monetary system where nobody can print new money.
              </p>
              <p className="text-lg text-yellow-300">
                Where everyone plays by the same rules. Where your purchasing power grows instead of shrinks.
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
              The Hero's Triumph →
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}; 