import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { Container } from '../components/layout/Container';
import { PowerLawChart } from '../components/ui/PowerLawChart';

export const HerosTriumph = () => {
  const { setCurrentStep } = useStore();
  const [currentAge, setCurrentAge] = useState<string>('25');
  const [currentSavings, setCurrentSavings] = useState<string>('10000');
  const [monthlySavings, setMonthlySavings] = useState<string>('500');
  const [bitcoinPrice, setBitcoinPrice] = useState<number>(100000);
  const [priceLoading, setPriceLoading] = useState<boolean>(true);

  // Fetch current Bitcoin price
  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        setBitcoinPrice(data.bitcoin.usd);
        setPriceLoading(false);
      } catch (error) {
        console.error('Failed to fetch Bitcoin price:', error);
        setBitcoinPrice(100000);
        setPriceLoading(false);
      }
    };

    fetchBitcoinPrice();
    const interval = setInterval(fetchBitcoinPrice, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBack = () => {
    setCurrentStep('same-rules');
  };

  // Bitcoin conversion functions
  const usdToBtc = (usdAmount: number): number => {
    return usdAmount / bitcoinPrice;
  };

  const usdToSats = (usdAmount: number): number => {
    return (usdAmount / bitcoinPrice) * 100000000;
  };

  // Power Law model for Bitcoin price prediction
  const bitcoinPowerLawPrice = (year: number): number => {
    const yearsFromGenesis = year - 2009;
    const basePrice = 0.001;
    const powerLawExponent = 5.8;
    return basePrice * Math.pow(yearsFromGenesis, powerLawExponent);
  };

  // Life goals calculations
  const calculateLifeGoals = () => {
    const age = parseInt(currentAge) || 25;
    const savings = parseFloat(currentSavings) || 0;
    const monthlyDCA = parseFloat(monthlySavings) || 0;
    
    const currentYear = new Date().getFullYear();
    const currentBtc = usdToBtc(savings);
    const monthlySats = usdToSats(monthlyDCA);
    
    const goals = {
      debtFreedom: 40000,
      houseDownPayment: 90000,
      familyReady: 150000,
      financialFreedom: 1000000,
      generationalWealth: 5000000
    };

    const results: any = {};
    
    Object.entries(goals).forEach(([goalName, goalAmount]) => {
      // Fiat calculation (with 8% inflation)
      let fiatSavings = savings;
      let fiatYear = currentYear;
      let fiatAge = age;
      const inflationRate = 0.08;
      
      while (fiatSavings < goalAmount && fiatYear < currentYear + 50) {
        fiatYear++;
        fiatAge++;
        fiatSavings = (fiatSavings + (monthlyDCA * 12)) * (1 - inflationRate);
      }
      
      // Bitcoin calculation (with Power Law appreciation)
      let btcAmount = currentBtc;
      let btcYear = currentYear;
      let btcAge = age;
      
      while (btcYear < currentYear + 50) {
        btcYear++;
        btcAge++;
        
        const yearlyDCA = monthlyDCA * 12;
        const avgBtcPriceThisYear = bitcoinPowerLawPrice(btcYear - 0.5);
        btcAmount += yearlyDCA / avgBtcPriceThisYear;
        
        const btcValueInUSD = btcAmount * bitcoinPowerLawPrice(btcYear);
        if (btcValueInUSD >= goalAmount) break;
      }
      
      results[goalName] = {
        fiat: { 
          year: fiatYear > currentYear + 49 ? 'Never' : fiatYear, 
          age: fiatAge > age + 49 ? 'Never' : fiatAge 
        },
        bitcoin: { year: btcYear, age: btcAge }
      };
    });

    return {
      currentBtc,
      monthlySats,
      goals: results,
      bitcoinPrice
    };
  };

  const lifeGoals = calculateLifeGoals();

  return (
    <div className="min-h-screen bg-black text-white pt-safe-top pb-safe-bottom">
      <Container className="py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              The Hero's Triumph
            </h1>
            
            <p className="text-xl text-gray-300 mb-4">
              Your Journey Toward Financial Freedom Begins
            </p>
            
            {/* Bitcoin Revelation */}
            <div className="bg-gradient-to-r from-orange-600 to-yellow-500 rounded-xl p-8 mb-8 border-2 border-orange-500">
              <h2 className="text-4xl font-bold text-white mb-4">
                It's Called Bitcoin.
              </h2>
              <p className="text-xl text-orange-100">
                The hard money with the same rules for everyone
              </p>
            </div>
          </div>

          {/* Bitcoin Introduction */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">What is Bitcoin?</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-600">
                <h3 className="text-xl font-bold text-orange-400 mb-4">Digital Hard Money</h3>
                <p className="text-gray-300">
                  Like gold, but digital. Only 21 million will ever exist. No one can print more.
                </p>
              </div>
              
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-600">
                <h3 className="text-xl font-bold text-orange-400 mb-4">Same Rules for Everyone</h3>
                <p className="text-gray-300">
                  No special privileges. Banks can't print it. Governments can't inflate it away.
                </p>
              </div>
              
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-600">
                <h3 className="text-xl font-bold text-orange-400 mb-4">Growing Purchasing Power</h3>
                <p className="text-gray-300">
                  As more people adopt it and fiat currencies weaken, your Bitcoin buys more over time.
                </p>
              </div>
            </div>

            {/* Current Bitcoin Price */}
            <div className="text-center mb-8">
              <div className="bg-gray-800/50 rounded-lg p-6 inline-block">
                <p className="text-lg text-gray-300 mb-2">Current Bitcoin Price</p>
                <div className="text-3xl font-bold text-orange-400">
                  {priceLoading ? 'Loading...' : `$${bitcoinPrice.toLocaleString()}`}
                </div>
                <p className="text-sm text-gray-400 mt-2">Updated every 5 minutes</p>
              </div>
            </div>
          </div>

          {/* Life Calculator */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Your Life with Bitcoin vs Without Bitcoin</h2>
            
            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-600">
              {/* User Inputs */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-6">Your Current Situation</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Your Current Age
                      </label>
                      <input
                        type="number"
                        value={currentAge}
                        onChange={(e) => setCurrentAge(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white"
                        placeholder="25"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Current Savings (USD)
                      </label>
                      <input
                        type="number"
                        value={currentSavings}
                        onChange={(e) => setCurrentSavings(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white"
                        placeholder="10000"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Monthly Savings (USD)
                      </label>
                      <input
                        type="number"
                        value={monthlySavings}
                        onChange={(e) => setMonthlySavings(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white"
                        placeholder="500"
                      />
                    </div>
                  </div>
                </div>

                {/* Bitcoin Conversion */}
                <div>
                  <h3 className="text-xl font-bold mb-6">Your Savings in Bitcoin</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-orange-900/20 border border-orange-600/30 rounded-lg p-4">
                      <p className="text-orange-300 font-semibold mb-2">Current Savings</p>
                      <p className="text-2xl font-bold text-orange-400">
                        {lifeGoals.currentBtc.toFixed(3)} BTC
                      </p>
                      <p className="text-sm text-orange-200">
                        ${parseFloat(currentSavings || '0').toLocaleString()} ÷ ${bitcoinPrice.toLocaleString()} = {lifeGoals.currentBtc.toFixed(3)} BTC
                      </p>
                    </div>
                    
                    <div className="bg-orange-900/20 border border-orange-600/30 rounded-lg p-4">
                      <p className="text-orange-300 font-semibold mb-2">Monthly Bitcoin Purchase</p>
                      <p className="text-2xl font-bold text-orange-400">
                        {Math.round(lifeGoals.monthlySats).toLocaleString()} sats
                      </p>
                      <p className="text-sm text-orange-200">
                        ${parseFloat(monthlySavings || '0').toLocaleString()}/month in Bitcoin
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <p className="text-gray-300 text-sm">
                        <strong>What are "sats"?</strong><br/>
                        Satoshis (sats) are the smallest unit of Bitcoin. 
                        There are 100 million sats in 1 Bitcoin.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div>
                  <h3 className="text-xl font-bold mb-6">Financial Freedom Timeline</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4">
                      <p className="text-red-300 font-semibold mb-2">Fiat Savings Path</p>
                      <p className="text-lg text-red-400">
                        Financial Freedom: {lifeGoals.goals.financialFreedom.fiat.age === 'Never' ? 'Never' : `Age ${lifeGoals.goals.financialFreedom.fiat.age}`}
                      </p>
                      <p className="text-sm text-red-200">Inflation eats your savings</p>
                    </div>
                    
                    <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
                      <p className="text-green-300 font-semibold mb-2">Bitcoin Savings Path</p>
                      <p className="text-lg text-green-400">
                        Financial Freedom: Age {lifeGoals.goals.financialFreedom.bitcoin.age}
                      </p>
                      <p className="text-sm text-green-200">Hard money preserves wealth</p>
                    </div>
                    
                    <div className="bg-orange-900/20 border border-orange-600/30 rounded-lg p-4">
                      <p className="text-orange-300 font-semibold mb-2">Time Saved</p>
                      <p className="text-lg text-orange-400">
                        {lifeGoals.goals.financialFreedom.fiat.age === 'Never' 
                          ? 'Entire Lifetime' 
                          : `${lifeGoals.goals.financialFreedom.fiat.age - lifeGoals.goals.financialFreedom.bitcoin.age} Years`
                        }
                      </p>
                      <p className="text-sm text-orange-200">Earlier financial freedom</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Chart */}
              <div className="mb-8">
                <PowerLawChart
                  currentAge={currentAge}
                  currentSavings={currentSavings}
                  monthlySavings={monthlySavings}
                  bitcoinPrice={bitcoinPrice}
                />
              </div>
            </div>
          </div>

          {/* The Revelation */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-green-900/30 to-orange-900/30 rounded-xl p-8 border border-orange-600/50">
              <h2 className="text-3xl font-bold text-orange-400 mb-4">
                Same Discipline, Different Outcome
              </h2>
              <p className="text-xl text-gray-300 mb-4">
                You don't need to save more money. You just need to save in better money.
              </p>
              <p className="text-lg text-orange-300">
                Your existing savings plan + Bitcoin = Financial freedom decades earlier
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-6">Ready to Start Your Bitcoin Journey?</h2>
            
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-600 mb-8">
              <h3 className="text-xl font-bold text-orange-400 mb-4">Next Steps</h3>
              <div className="text-left max-w-2xl mx-auto space-y-3">
                <p className="text-gray-300">1. <strong>Learn more:</strong> Visit bitcoin.org for educational resources</p>
                <p className="text-gray-300">2. <strong>Start small:</strong> Buy $25-50 worth to get familiar</p>
                <p className="text-gray-300">3. <strong>Dollar-cost average:</strong> Set up recurring Bitcoin purchases</p>
                <p className="text-gray-300">4. <strong>Secure storage:</strong> Learn about Bitcoin wallets and self-custody</p>
              </div>
            </div>

            <a 
              href="https://bitcoin.org/en/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button className="px-12 py-4 text-lg">
                Start Your Bitcoin Education →
              </Button>
            </a>
          </div>

          {/* Navigation */}
          <div className="flex justify-center">
            <Button 
              onClick={handleBack}
              variant="outline"
            >
              ← Back to Same Rules
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}; 