import { PageReferences } from '../types';

export const pageReferences: PageReferences[] = [
  {
    pageId: 'question-everything',
    references: [
      {
        id: 'college-cost-calculation',
        title: 'College Affordability: Total Cost Including Room & Board',
        description: '1979-80: Total college costs (tuition + room + board + fees) ~$3,500/year, minimum wage $3.10 = 22 hrs/week. 2024: Total college costs ~$38,000/year, minimum wage $7.25 = 101 hrs/week. Room and board costs have exploded alongside tuition - housing, meal plans, and mandatory fees now comprise majority of college expenses. The "22 hours vs 101 hours" represents the full cost of college attendance, not just tuition. Math: $3,500 ÷ $3.10 ÷ 52 weeks = 21.7 hrs/week vs $38,000 ÷ $7.25 ÷ 52 weeks = 101.1 hrs/week.',
        url: 'https://nces.ed.gov/programs/digest/d22/tables/dt22_330.10.asp',
        type: 'calculation'
      },
      {
        id: 'housing-price-ratio',
        title: 'Housing Affordability Crisis: Historical Perspective',
        description: 'Federal Reserve Economic Data (FRED) showing median home price to median household income ratio over time. Data demonstrates the dramatic decrease in housing affordability since 1980.',
        url: 'https://fred.stlouisfed.org/series/MEHOINUSA672N',
        type: 'data'
      },
      {
        id: 'young-adults-living-home',
        title: 'Record Share of Young Adults Living with Parents',
        description: 'Pew Research Center analysis showing 52% of young adults (18-29) lived with parents in 2020, the highest level since the Great Depression. Includes historical comparison data.',
        url: 'https://www.pewresearch.org/fact-tank/2020/09/04/a-majority-of-young-adults-in-the-u-s-live-with-their-parents-for-the-first-time-since-the-great-depression/',
        type: 'study'
      },
      {
        id: 'retirement-crisis',
        title: 'The Retirement Crisis: Pension Destruction and 401k Inadequacy',
        description: 'Economic Policy Institute study on the transition from defined benefit pensions to 401k plans and its impact on retirement security. Shows median 401k balance of $65,000 for near-retirees.',
        url: 'https://www.epi.org/publication/retirement-in-america/',
        type: 'study'
      },
      {
        id: 'real-wage-stagnation',
        title: 'Productivity vs. Wages: The Great Decoupling',
        description: 'Economic Policy Institute research showing productivity increased 70% since 1973 while wages for typical workers increased only 12%. Demonstrates why traditional economic formulas no longer work.',
        url: 'https://www.epi.org/productivity-pay-gap/',
        type: 'study'
      },
      {
        id: 'housing-affordability-calculation',
        title: 'Housing Affordability: Income Multiple Comparison',
        description: '1980: Median home price $68,700, median household income $19,500 = 3.5 years of income to buy a house. 2024: Median home price $420,000, median household income $33,600 = 12.5 years of income. Math: $68,700 ÷ $19,500 = 3.52 vs $420,000 ÷ $33,600 = 12.5. This assumes dedicating 100% of gross household income to housing costs with zero other expenses - an impossible scenario that shows the mathematical impossibility of homeownership today.',
        url: '#housing-math',
        type: 'calculation'
      }
    ]
  }
];

// Helper function to get references for a specific page
export const getPageReferences = (pageId: string) => {
  return pageReferences.find(page => page.pageId === pageId)?.references || [];
}; 