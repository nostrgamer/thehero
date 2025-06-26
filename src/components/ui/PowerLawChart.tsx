import React from 'react';
import Plot from 'react-plotly.js';
import { useStore } from '../../store/useStore';

interface PowerLawChartProps {
  currentAge: string;
  currentSavings: string;
  monthlySavings: string;
  bitcoinPrice: number;
}

export const PowerLawChart: React.FC<PowerLawChartProps> = ({
  currentAge,
  currentSavings,
  monthlySavings,
  bitcoinPrice
}) => {
  const { userData } = useStore();
  
  const currentYear = new Date().getFullYear();
  const ages = Array.from({ length: 50 }, (_, i) => parseInt(currentAge) + i);
  const years = ages.map((_, i) => currentYear + i);

  // Bitcoin Power Law model
  const bitcoinPowerLawPrice = (year: number): number => {
    const daysFromGenesis = (year - 2009) * 365.25;
    return 1.0117e-17 * Math.pow(daysFromGenesis, 5.82);
  };

  // Helper functions
  const usdToBtc = (usdAmount: number, btcPrice = bitcoinPrice): number => {
    return usdAmount / btcPrice;
  };

  // Power Law price data
  const powerLawData = years.map(year => bitcoinPowerLawPrice(year));
  
  // User's Bitcoin stack value
  const bitcoinStackValues = ages.map((_, i) => {
    const year = i;
    const savings = parseFloat(currentSavings || '0');
    const monthlyDCA = parseFloat(monthlySavings || '0');
    
    if (savings === 0 && monthlyDCA === 0) {
      return 0; // Show zero when no savings or DCA
    }
    
    // Start with initial Bitcoin from current savings at current price
    let btcAmount = savings > 0 ? usdToBtc(savings, bitcoinPrice) : 0;
    
    // Add monthly DCA for each year
    for (let j = 1; j <= year; j++) {
      const yearlyDCA = monthlyDCA * 12;
      const avgBtcPrice = bitcoinPowerLawPrice(currentYear + j - 0.5);
      btcAmount += yearlyDCA / avgBtcPrice;
    }
    
    const btcPrice = bitcoinPowerLawPrice(currentYear + year);
    const totalValue = btcAmount * btcPrice;
    return totalValue;
  });
  
  // Fiat savings (declining due to inflation)
  const fiatSavings = ages.map((_, i) => {
    const year = i;
    const savings = parseFloat(currentSavings || '0');
    const monthlyDCA = parseFloat(monthlySavings || '0');
    const inflationRate = 0.08;
    
    if (savings === 0 && monthlyDCA === 0) {
      return 0; // Show zero when no savings
    }
    
    if (year === 0) {
      return savings; // Show actual entered amount for current year
    }
    
    let fiatValue = savings;
    for (let j = 1; j <= year; j++) {
      fiatValue = fiatValue + (monthlyDCA * 12);
      fiatValue = fiatValue * (1 - inflationRate);
    }
    return fiatValue;
  });

      // Calculate Financial Freedom goal based on user's income (19x annual income)
  // Fall back to $1M if no income data available
  const annualIncome = userData.yearlySalary || 50000; // Default to $50k if no data
      const financialFreedomGoal = annualIncome * 19;

  // Family Ready calculation: House down payment + family cushion
  const houseDownPayment = 90000; // 20% down on $450K house
  const familyCushion = 60000; // Additional cushion for starting a family
  const familyReadyGoal = houseDownPayment + familyCushion; // $150K total

  // Goal lines data with different colors
  const goalLines = [
    { value: houseDownPayment, label: 'House Down Payment', color: '#fbbf24' }, // Yellow
    { value: familyReadyGoal, label: 'Family Ready (House + Cushion)', color: '#a855f7' }, // Purple  
          { value: financialFreedomGoal, label: `Financial Freedom (19x income)`, color: '#06b6d4' }, // Cyan
  ];

  // Create goal line traces for legend (instead of shapes)
  const goalTraces = goalLines.map(goal => ({
    x: [ages[0], ages[ages.length - 1]],
    y: [goal.value, goal.value],
    type: 'scatter' as const,
    mode: 'lines' as const,
    name: goal.label,
    line: {
      color: goal.color,
      width: 2,
      dash: 'dash' as const
    },
    hovertemplate: `<b>${goal.label}</b><br>Target: $%{y:,.0f}<extra></extra>`,
    showlegend: true
  }));

  const data = [
    {
      x: ages,
      y: powerLawData,
      type: 'scatter' as const,
      mode: 'lines' as const,
      name: 'Bitcoin Price (Power Law)',
      line: {
        color: '#f97316',
        width: 3
      },
      hovertemplate: '<b>Bitcoin Price</b><br>Age: %{x}<br>Price: $%{y:,.0f}<extra></extra>'
    },
    {
      x: ages,
      y: bitcoinStackValues,
      type: 'scatter' as const,
      mode: 'lines' as const,
      name: 'Your Bitcoin Stack Value',
      line: {
        color: '#10b981',
        width: 4,
        dash: 'dash' as const
      },
      hovertemplate: '<b>Your Bitcoin Stack</b><br>Age: %{x}<br>Value: $%{y:,.0f}<extra></extra>'
    },
    {
      x: ages,
      y: fiatSavings,
      type: 'scatter' as const,
      mode: 'lines' as const,
      name: 'Fiat Savings (Inflating Away)',
      line: {
        color: '#ef4444',
        width: 3
      },
      hovertemplate: '<b>Fiat Savings</b><br>Age: %{x}<br>Value: $%{y:,.0f}<extra></extra>'
    },
    ...goalTraces
  ] as any;

  // Calculate proper y-axis range for better zoom
  const allValues = [...powerLawData, ...bitcoinStackValues, ...fiatSavings].filter(v => v > 0);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const logMin = Math.log10(Math.max(1, minValue * 0.5));
  const logMax = Math.log10(maxValue * 2);

  const layout = {
    title: {
      text: 'Bitcoin Power Law (Log Scale)',
      font: {
        color: '#f97316',
        size: 16,
        family: 'Arial, sans-serif'
      }
    },
    xaxis: {
      title: {
        text: 'Your Age',
        font: {
          color: '#9ca3af',
          size: 10
        },
        standoff: 8
      },
      tickfont: {
        color: '#9ca3af',
        size: 9
      },
      gridcolor: 'rgba(55, 65, 81, 0.3)',
      showgrid: true,
      range: [ages[0], ages[ages.length - 1]],
      automargin: true,
      tickmode: 'auto' as const,
      dtick: 2,
      side: 'bottom' as const,
      fixedrange: true
    },
    yaxis: {
      title: {
        text: 'Value (USD)',
        font: {
          color: '#9ca3af',
          size: 10
        }
      },
      type: 'log' as const,
      tickfont: {
        color: '#9ca3af',
        size: 9
      },
      gridcolor: 'rgba(55, 65, 81, 0.3)',
      showgrid: true,
      tickvals: [10000, 100000, 1000000, 10000000, 100000000, 1000000000],
      ticktext: ['$10k', '$100k', '$1M', '$10M', '$100M', '$1B'],
      range: [logMin, logMax],
      automargin: true,
      fixedrange: true
    },
    plot_bgcolor: 'rgba(0, 0, 0, 0)',
    paper_bgcolor: 'rgba(0, 0, 0, 0)',
    font: {
      color: '#ffffff'
    },
    legend: {
      x: 0,
      y: -0.20,
      orientation: 'h' as const,
      font: {
        color: '#9ca3af',
        size: 9
      }
    },
    margin: {
      l: 70,
      r: 50,
      t: 60,
      b: 140
    },
    autosize: true
  };

  const config = {
    displayModeBar: false,
    displaylogo: false,
    responsive: true,
    scrollZoom: false,
    doubleClick: false,
    showTips: false,
    staticPlot: false
  } as any;

  return (
    <div className="relative">
      <div className="h-[450px] sm:h-[500px] md:h-[550px] lg:h-[650px]">
        <Plot
          data={data}
          layout={layout}
          config={config}
          style={{ width: '100%', height: '100%' }}
          useResizeHandler={true}
        />
      </div>
      
      {/* Chart Tips */}
      <div className="mt-4 bg-gray-900/50 rounded-lg p-3 border border-orange-500/30">
        <div className="text-sm text-gray-300 text-center">
          <span className="text-orange-400 font-medium">💡 Tip:</span> Click legend to show/hide lines
        </div>
      </div>

    </div>
  );
}; 