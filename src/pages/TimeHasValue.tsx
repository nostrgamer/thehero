import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { Container } from '../components/layout/Container';

export const TimeHasValue = () => {
  const { setCurrentStep } = useStore();
  const [takeHomePay, setTakeHomePay] = useState<string>('');
  const [selectedPurchase, setSelectedPurchase] = useState<string>('');
  const [payFrequency, setPayFrequency] = useState<string>('bi-weekly');
  const [currentAge, setCurrentAge] = useState<string>('');
  const [hasCollegeDebt, setHasCollegeDebt] = useState<string>('');
  const [existingDebt, setExistingDebt] = useState<string>('');
  const [currentRetirementSavings, setCurrentRetirementSavings] = useState<string>('');
  const [monthlyRetirementContribution, setMonthlyRetirementContribution] = useState<string>('');

  const handleNext = () => {
    setCurrentStep('seek-understanding');
  };

  const handleBack = () => {
    setCurrentStep('question-everything');
  };

  // Calculate annual take-home pay
  const getAnnualPay = () => {
    const pay = parseFloat(takeHomePay) || 0;
    switch (payFrequency) {
      case 'weekly': return pay * 52;
      case 'bi-weekly': return pay * 26;
      case 'monthly': return pay * 12;
      case 'annually': return pay;
      default: return pay * 26;
    }
  };

  const annualPay = getAnnualPay();
  const effectiveHourlyRate = annualPay / 2080; // 40 hours * 52 weeks
  const age = parseInt(currentAge) || 0;
  const currentDebt = hasCollegeDebt === 'yes' ? (parseFloat(existingDebt) || 0) : 0;

  // Calculate scenarios from current age and situation
  const calculateCollege = () => {
    const totalCost = 120000; // $30k/year * 4 years
    const studentContribution = 30000; // Min wage, 20 hrs/week, 4 years
    const newDebt = 90000;
    const totalDebt = currentDebt + newDebt; // Existing debt + new college debt
    const maxPayment = annualPay * 0.10; // 10% of income cap
    const monthlyPayment = maxPayment / 12;
    
    // Calculate years to pay off total debt at 9% interest
    const yearsToPayOff = totalDebt > 0 ? Math.log(1 + (totalDebt * 0.09) / maxPayment) / Math.log(1.09) : 0;
    const graduationAge = age + 4; // 4 years of college
    
    return {
      totalDebt,
      monthlyPayment: Math.round(monthlyPayment),
      yearsToPayOff: Math.round(yearsToPayOff),
      graduationAge,
      ageWhenPaidOff: graduationAge + Math.round(yearsToPayOff),
      tooOld: graduationAge > 30
    };
  };

  const calculateHouse = () => {
    const housePrice = 450000;
    const downPayment = 90000; // 20%
    const currentLoanPayment = currentDebt > 0 ? annualPay * 0.10 : 0;
    const savingsCapacity = annualPay * 0.20; // 20% savings rate
    const actualSavings = Math.max(0, savingsCapacity - currentLoanPayment);
    const yearsToSave = actualSavings > 0 ? downPayment / actualSavings : Infinity;
    
    return {
      downPayment,
      savingsCapacity: Math.round(savingsCapacity),
      actualSavings: Math.round(actualSavings),
      yearsToSave: Math.round(yearsToSave),
      ageWhenCanBuy: age + Math.round(yearsToSave),
      currentLoanPayment: Math.round(currentLoanPayment)
    };
  };

  const calculateFamily = () => {
    const costPerChild = 300000; // Lifetime cost
    const annualChildCost = 16667; // $300k / 18 years
    const house = calculateHouse();
    const currentLoanPayment = currentDebt > 0 ? annualPay * 0.10 : 0;
    
    const remainingIncome = annualPay - currentLoanPayment - annualChildCost;
    const canAfford = remainingIncome > 0;
    
    // When can they afford children?
    const ageWhenReady = Math.max(house.ageWhenCanBuy, age);
    
    // Fertility timeline - more realistic
    const fertilityYearsLeft = Math.max(0, 35 - age); // Prime fertility until 35
    const biologicalWindowClosing = age >= 30;
    const veryRisky = age >= 40;
    const nearlyImpossible = age >= 45;
    const tooLateForKids = age >= 47;
    
    return {
      costPerChild,
      annualCost: annualChildCost,
      canAfford,
      ageWhenReady,
              remainingIncome: Math.round(remainingIncome),
        fertilityYearsLeft,
        biologicalWindowClosing,
        veryRisky,
        nearlyImpossible,
        tooLateForKids
    };
  };

  const calculateRetirement = () => {
    const currentSavings = parseFloat(currentRetirementSavings) || 0;
    const monthlyContribution = parseFloat(monthlyRetirementContribution) || 0;
    const annualContribution = monthlyContribution * 12;
    const currentLoanPayment = currentDebt > 0 ? annualPay * 0.10 : 0;
    
    // Retirement need: 20x annual income (realistic for comfortable retirement without Social Security)
    // Social Security will be bankrupt by 2035 - accounts for reduced earnings during family years
    const retirementNeed = annualPay * 20; // 20x annual income for actual comfort
    
    // Account for debt payments reducing retirement contributions
    const actualAnnualContribution = Math.max(0, annualContribution - (currentLoanPayment * 0.5)); // Debt cuts retirement in half
    
    // Compound interest calculation (assuming 7% annual return)
    const annualReturn = 0.07;
    const yearsToRetirement = 65 - age;
    
    if (yearsToRetirement <= 0) {
      return {
        retirementNeed,
        currentSavings,
        projectedSavings: currentSavings,
        shortfall: retirementNeed - currentSavings,
        canRetire: false,
        workUntilDeath: true,
        yearsToRetirement: 0,
        monthlyNeeded: 0
      };
    }
    
    // Calculate projected savings with compound interest
    let projectedSavings = currentSavings;
    for (let i = 0; i < yearsToRetirement; i++) {
      projectedSavings = (projectedSavings + actualAnnualContribution) * (1 + annualReturn);
    }
    
    const shortfall = retirementNeed - projectedSavings;
    const canRetire = shortfall <= 0;
    
    // Calculate monthly amount needed to retire comfortably
    const neededAnnualSavings = (retirementNeed - currentSavings * Math.pow(1 + annualReturn, yearsToRetirement)) / 
                               (((Math.pow(1 + annualReturn, yearsToRetirement) - 1) / annualReturn));
    const monthlyNeeded = neededAnnualSavings / 12;
    
    return {
      retirementNeed,
      currentSavings,
      projectedSavings: Math.round(projectedSavings),
      shortfall: Math.round(shortfall),
      canRetire,
      workUntilDeath: !canRetire && shortfall > annualPay * 5, // If shortfall > 5x income, essentially impossible
      yearsToRetirement,
      monthlyNeeded: Math.round(monthlyNeeded),
      actualAnnualContribution: Math.round(actualAnnualContribution),
      debtImpact: currentLoanPayment > 0
    };
  };

  const renderCalculation = () => {
    if (!takeHomePay || !selectedPurchase || !currentAge) return null;

    const college = calculateCollege();
    const house = calculateHouse();
    const family = calculateFamily();
    const retirement = calculateRetirement();

    if (selectedPurchase === 'college') {
      return (
        <div className="bg-red-900/30 border border-red-600/50 rounded-xl p-6 lg:p-8">
          <h3 className="text-2xl font-bold text-red-400 mb-6">
            {age > 25 ? 'Going Back to School Reality Check' : 'College Reality Check'}
          </h3>
          
          {college.tooOld && (
            <div className="bg-yellow-900/50 border border-yellow-600/50 rounded-lg p-4 mb-6">
              <p className="text-yellow-300 font-semibold">
                ⚠️ Starting college at age {age} means graduating at {college.graduationAge} - 
                this puts you behind your peers by years.
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-red-800/20 rounded-lg p-4">
              <div className="text-3xl font-bold text-red-300 mb-2">${college.totalDebt.toLocaleString()}</div>
              <p className="text-red-200 text-sm">
                {currentDebt > 0 ? 'Total debt (existing + new)' : 'New debt after graduation'}
              </p>
            </div>
            <div className="bg-red-800/20 rounded-lg p-4">
              <div className="text-3xl font-bold text-red-300 mb-2">${college.monthlyPayment}</div>
              <p className="text-red-200 text-sm">Monthly payment (10% of income)</p>
            </div>
            <div className="bg-red-800/20 rounded-lg p-4">
              <div className="text-3xl font-bold text-red-300 mb-2">Age {college.graduationAge}</div>
              <p className="text-red-200 text-sm">When you graduate</p>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-red-400 mb-2">{college.yearsToPayOff} years</div>
            <p className="text-red-300">To pay off all college debt</p>
            <p className="text-red-200 text-sm">You'll be {college.ageWhenPaidOff} years old when finally debt-free</p>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <p className="text-yellow-400 font-semibold">
              {age > 30 
                ? "Starting college this late in life severely limits your earning years."
                : currentDebt > 0 
                ? "Adding more debt to existing loans creates a debt spiral that's hard to escape."
                : "This debt will follow you for decades, making everything else harder to afford."
              }
            </p>
          </div>
        </div>
      );
    }

    if (selectedPurchase === 'house') {
      return (
        <div className="bg-red-900/30 border border-red-600/50 rounded-xl p-6 lg:p-8">
          <h3 className="text-2xl font-bold text-red-400 mb-6">House Reality Check</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-red-800/20 rounded-lg p-4">
              <div className="text-3xl font-bold text-red-300 mb-2">$90,000</div>
              <p className="text-red-200 text-sm">Down payment needed</p>
            </div>
            <div className="bg-red-800/20 rounded-lg p-4">
              <div className="text-3xl font-bold text-red-300 mb-2">${house.actualSavings.toLocaleString()}</div>
              <p className="text-red-200 text-sm">What you can actually save per year</p>
              {house.currentLoanPayment > 0 && (
                <p className="text-xs text-red-300">(After ${house.currentLoanPayment.toLocaleString()} loan payments)</p>
              )}
            </div>
            <div className="bg-red-800/20 rounded-lg p-4">
              <div className="text-3xl font-bold text-red-300 mb-2">Age {age}</div>
              <p className="text-red-200 text-sm">Your current age</p>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-red-400 mb-2">
              {house.yearsToSave === Infinity ? '∞' : house.yearsToSave} years
            </div>
            <p className="text-red-300">To save for down payment from now</p>
            <p className="text-red-200 text-sm">
              {house.ageWhenCanBuy > 50 
                ? "Paying rent until your 50s - severely limits family options"
                : house.ageWhenCanBuy > 45 
                ? `Paying rent until ${house.ageWhenCanBuy} - missing prime family years`
                : `Paying rent until age ${house.ageWhenCanBuy}`}
            </p>
          </div>

          {house.yearsToSave > 15 && (
            <div className="bg-yellow-900/50 border border-yellow-600/50 rounded-lg p-4 mb-6">
              <p className="text-yellow-300 font-semibold text-center">
                ⚠️ Warning: Saving for {house.yearsToSave} years means missing the best homebuying years
              </p>
            </div>
          )}

          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <p className="text-yellow-400 font-semibold">
              {currentDebt > 0 
                ? "Existing debt forces you to rent longer, making family planning harder."
                : house.actualSavings < 5000
                ? "Low income means renting longer - less stability for raising children."
                : "Years of rent payments instead of building equity limits family options."
              }
            </p>
          </div>
        </div>
      );
    }

    if (selectedPurchase === 'family') {
      return (
        <div className="bg-red-900/30 border border-red-600/50 rounded-xl p-6 lg:p-8">
          <h3 className="text-2xl font-bold text-red-400 mb-6">Family Reality Check</h3>
          
          {/* Fertility Timeline Warning */}
          {family.biologicalWindowClosing && (
            <div className="bg-red-800/50 border border-red-500 rounded-lg p-4 mb-6">
              <p className="text-red-200 font-semibold text-center">
                🚨 BIOLOGICAL REALITY: You are {age} years old. 
                {family.tooLateForKids 
                  ? " Healthy pregnancy is essentially impossible at this age." 
                  : family.nearlyImpossible
                  ? " Less than 1% chance of healthy pregnancy."
                  : family.veryRisky
                  ? " Very high risk of complications and birth defects."
                  : ` You have approximately ${family.fertilityYearsLeft} prime fertility years left.`}
              </p>
            </div>
          )}

          {/* Current vs Future Timeline */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold text-white mb-4">Your Reality Timeline</h4>
            <div className="bg-gray-800/50 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Your current age:</span>
                  <span className="text-white font-bold">{age} years old</span>
                </div>
                
                {currentDebt > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Current debt burden:</span>
                    <span className="text-red-300">${house.currentLoanPayment.toLocaleString()}/year payments</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">House purchase possible:</span>
                  <span className="text-red-300">Age {house.ageWhenCanBuy}</span>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-600 pt-4">
                  <span className="text-gray-300">Financially ready for family:</span>
                  <span className={family.ageWhenReady > 35 ? "text-red-400 font-bold" : "text-yellow-400"}>
                    Age {family.ageWhenReady}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Prime fertility window:</span>
                  <span className={age > 35 ? "text-red-400" : age > 30 ? "text-yellow-400" : "text-green-400"}>
                    {age > 35 ? "Closing rapidly" : age > 30 ? "Limited time left" : "Still open"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-red-800/20 rounded-lg p-4">
              <div className="text-3xl font-bold text-red-300 mb-2">${family.annualCost.toLocaleString()}</div>
              <p className="text-red-200 text-sm">Cost per child per year</p>
            </div>
            <div className="bg-red-800/20 rounded-lg p-4">
              <div className="text-3xl font-bold text-red-300 mb-2">
                {family.remainingIncome > 0 ? `$${family.remainingIncome.toLocaleString()}` : '$0'}
              </div>
              <p className="text-red-200 text-sm">Income left after all payments</p>
            </div>
            <div className="bg-red-800/20 rounded-lg p-4">
              <div className="text-3xl font-bold text-red-300 mb-2">
                {family.fertilityYearsLeft}
              </div>
              <p className="text-red-200 text-sm">Prime fertility years remaining</p>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-red-400 mb-2">
              {family.tooLateForKids ? "Too Late" : `Age ${family.ageWhenReady}`}
            </div>
            <p className="text-red-300">
              {family.tooLateForKids 
                ? "Fertility window has largely closed"
                : "When you might be financially ready"}
            </p>
            <p className="text-red-200 text-sm">
              {family.ageWhenReady >= 47 
                ? "Essentially impossible - too late for healthy pregnancy"
                : family.ageWhenReady >= 45
                ? "Nearly impossible - less than 1% chance of success"
                : family.ageWhenReady >= 40 
                ? "Very high risk - significant complications likely"
                : family.ageWhenReady > 35 
                ? "Geriatric pregnancy - increased medical risks"
                : family.ageWhenReady > 30
                ? "Fertility declining but still reasonable chance"
                : "Still within optimal fertility window"}
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <p className="text-yellow-400 font-semibold text-lg mb-2">
              The Script's Promise: "Get financially stable first, then have kids"
            </p>
            <p className="text-red-400 font-bold text-xl">
              {family.tooLateForKids 
                ? "The Reality: By the time you're stable, healthy pregnancy is impossible"
                : family.nearlyImpossible
                ? "The Reality: Financial stability comes when it's nearly too late"
                : family.veryRisky
                ? "The Reality: Financial stability comes at high medical risk"
                : family.ageWhenReady > 35
                ? "The Reality: Financial stability pushes you into geriatric pregnancy"
                : "The Reality: You're racing against your biological clock"}
            </p>
          </div>
        </div>
      );
    }

    if (selectedPurchase === 'retirement') {
      return (
        <div className="bg-red-900/30 border border-red-600/50 rounded-xl p-6 lg:p-8">
          <h3 className="text-2xl font-bold text-red-400 mb-6">Retirement Reality Check</h3>
          
          {/* Late Start Warning */}
          {age > 35 && (
            <div className="bg-yellow-900/50 border border-yellow-600/50 rounded-lg p-4 mb-6">
              <p className="text-yellow-300 font-semibold">
                ⚠️ Starting serious retirement savings at {age} means you've lost the power of compound interest in your 20s and early 30s. Social Security will be bankrupt by 2035 - you're completely on your own.
              </p>
            </div>
          )}
          
          {age <= 35 && (
            <div className="bg-red-900/50 border border-red-600/50 rounded-lg p-4 mb-6">
                             <p className="text-red-300 font-semibold">
                 💀 Social Security will be bankrupt by 2035. The "comfortable retirement" your grandparents had requires 20x your annual income - not the 10-12x financial advisors lie about.
               </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-red-800/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-300 mb-2">${(retirement.retirementNeed / 1000000).toFixed(1)}M</div>
              <p className="text-red-200 text-sm">What you need to retire (20x income)</p>
              <p className="text-xs text-red-300">Social Security won't exist</p>
            </div>
            <div className="bg-red-800/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-300 mb-2">
                {retirement.projectedSavings >= 1000000 
                  ? `$${(retirement.projectedSavings / 1000000).toFixed(1)}M`
                  : `$${(retirement.projectedSavings / 1000).toFixed(0)}K`
                }
              </div>
              <p className="text-red-200 text-sm">What you'll actually have at 65</p>
              {retirement.debtImpact && (
                <p className="text-xs text-red-300">(Reduced by debt payments)</p>
              )}
            </div>
            <div className="bg-red-800/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-300 mb-2">
                {retirement.shortfall > 0 
                  ? retirement.shortfall >= 1000000 
                    ? `-$${(retirement.shortfall / 1000000).toFixed(1)}M`
                    : `-$${(retirement.shortfall / 1000).toFixed(0)}K`
                  : '+$0'
                }
              </div>
              <p className="text-red-200 text-sm">
                {retirement.shortfall > 0 ? 'Shortfall' : 'Surplus'}
              </p>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-red-400 mb-2">
              {retirement.workUntilDeath ? 'Never' : retirement.canRetire ? 'Age 65' : 'Age 70+'}
            </div>
            <p className="text-red-300">When you can actually retire</p>
            <p className="text-red-200 text-sm">
              {retirement.workUntilDeath 
                ? "You'll likely work until you die"
                : retirement.canRetire 
                ? "You can retire at the traditional age"
                : "You'll need to work well past traditional retirement age"
              }
            </p>
          </div>

          {retirement.shortfall > 0 && (
            <div className="bg-yellow-900/50 border border-yellow-600/50 rounded-lg p-4 mb-6">
              <div className="text-center">
                <p className="text-yellow-300 font-semibold mb-2">
                  To retire at 65, you need to save:
                </p>
                <div className="text-2xl font-bold text-yellow-400">
                  ${retirement.monthlyNeeded >= 1000 
                    ? `${(retirement.monthlyNeeded / 1000).toFixed(1)}K`
                    : retirement.monthlyNeeded.toLocaleString()
                  }/month
                </div>
                <p className="text-yellow-200 text-sm">
                  {retirement.monthlyNeeded > annualPay / 12 * 0.5 
                    ? "That's more than half your monthly income - essentially impossible"
                    : retirement.monthlyNeeded > annualPay / 12 * 0.3
                    ? "That's over 30% of your income - very difficult to sustain"
                    : "This might be achievable with discipline"
                  }
                </p>
              </div>
            </div>
          )}

          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <p className="text-yellow-400 font-semibold">
              {retirement.workUntilDeath
                ? "The Reality: The script promises you can 'save for retirement' but Social Security is bankrupt and wages can't support 20x income savings. You'll work until you die."
                : retirement.shortfall > annualPay * 10
                ? "The Reality: You need millions to retire comfortably. Financial advisors lied about 10-12x income - that was WITH Social Security."
                : currentDebt > 0 
                ? "The Reality: Debt payments are stealing from your future self while Social Security crumbles."
                : "The Reality: Your grandparents had pensions AND Social Security. You have neither. 20x income or work forever."
              }
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-safe-top pb-safe-bottom">
      <Container className="py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Your Time Has Real Value
            </h1>
            
            <p className="text-xl text-gray-300 mb-4">
              A hero realizes their most precious resource is being stolen
            </p>
            
            <div className="bg-gray-800/50 rounded-lg p-4 mb-8">
              <p className="text-lg text-gray-300 mb-2">
                You can't make more time. You can't buy more time. You can't borrow time.
              </p>
              <p className="text-xl font-semibold text-yellow-400">
                But you can calculate exactly how much time everything costs.
              </p>
            </div>
          </div>

          {/* Calculator */}
          <div className="bg-gray-900/50 rounded-xl p-6 lg:p-8 mb-8 border border-gray-600">
            <h2 className="text-2xl font-bold mb-6">Calculate Your Real Time-Cost</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Info */}
              <div>
                <h3 className="text-xl font-semibold mb-4">About You</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      How old are you?
                    </label>
                    <input
                      type="number"
                      value={currentAge}
                      onChange={(e) => setCurrentAge(e.target.value)}
                      placeholder="28"
                      min="18"
                      max="65"
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      How often do you get paid?
                    </label>
                    <select 
                      value={payFrequency} 
                      onChange={(e) => setPayFrequency(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="bi-weekly">Bi-weekly (every 2 weeks)</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="annually">Annually</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      What's your take-home pay? (USD)
                    </label>
                    <input
                      type="number"
                      value={takeHomePay}
                      onChange={(e) => setTakeHomePay(e.target.value)}
                      placeholder="1600"
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Do you currently have college debt?
                    </label>
                    <select 
                      value={hasCollegeDebt} 
                      onChange={(e) => setHasCollegeDebt(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="">Select...</option>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>

                  {hasCollegeDebt === 'yes' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        How much college debt do you have? (USD)
                      </label>
                      <input
                        type="number"
                        value={existingDebt}
                        onChange={(e) => setExistingDebt(e.target.value)}
                        placeholder="45000"
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  )}

                  {selectedPurchase === 'retirement' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Current retirement savings (401k, IRA, etc.)
                        </label>
                        <input
                          type="number"
                          value={currentRetirementSavings}
                          onChange={(e) => setCurrentRetirementSavings(e.target.value)}
                          placeholder="25000"
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Monthly retirement contribution
                        </label>
                        <input
                          type="number"
                          value={monthlyRetirementContribution}
                          onChange={(e) => setMonthlyRetirementContribution(e.target.value)}
                          placeholder="500"
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                    </>
                  )}
                  
                  {takeHomePay && currentAge && (
                    <div className="bg-green-800/20 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-300">
                        ${effectiveHourlyRate.toFixed(2)}/hour
                      </div>
                      <p className="text-green-200 text-sm">Your effective hourly rate</p>
                      <p className="text-xs text-green-300">Annual: ${annualPay.toLocaleString()}</p>
                      {currentDebt > 0 && (
                        <p className="text-xs text-red-300 mt-1">Current debt: ${currentDebt.toLocaleString()}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Scenario Selection */}
              <div>
                <h3 className="text-xl font-semibold mb-4">What scenario do you want to explore?</h3>
                
                <div className="space-y-3">
                  {[
                    { 
                      id: 'college', 
                      label: age > 0 && age > 25 ? 'Go Back to School' : 'College Education', 
                      desc: age > 0 && age > 30 ? 'Starting college at your age...' : '$30k/year, 4 years'
                    },
                    { id: 'house', label: 'Buy a House', desc: 'Median $450k, 20% down' },
                    { 
                      id: 'family', 
                      label: 'Start a Family', 
                      desc: age > 0 && age >= 35 ? 'Time is running out...' : '$300k per child lifetime'
                    },
                    { 
                      id: 'retirement', 
                      label: 'Retire Comfortably', 
                      desc: age > 0 && age > 40 ? 'Getting late to start...' : 'Need 11x annual income saved'
                    }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedPurchase(option.id)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedPurchase === option.id
                          ? 'border-bitcoin-orange bg-bitcoin-orange/10'
                          : 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
                      }`}
                    >
                      <div className="font-semibold">{option.label}</div>
                      <div className="text-sm text-gray-400">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          {renderCalculation()}

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between mt-12">
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
              A Hero Seeks Understanding →
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}; 