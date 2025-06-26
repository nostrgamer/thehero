import { PageReferences, Reference } from '../types';

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
  },
  {
    pageId: 'time-has-value',
    references: [
      {
        id: 'college-debt-calculation',
        title: 'College Debt Burden: 4-Year Public University Total Cost',
        description: 'Total college costs including room, board, and fees: $38,000/year x 4 years = $152,000. Student working 20 hrs/week at minimum wage contributes ~$30,000 over 4 years. Net new debt: $122,000. Math: ($7.25 x 20 hrs x 50 weeks) x 4 years = $29,000 student contribution. $152,000 - $30,000 = $122,000 new debt plus any existing debt. Uses same $38k annual cost from previous page calculation.',
        url: '#college-debt-math',
        type: 'calculation'
      },
      {
        id: 'house-down-payment-calculation',
        title: 'Housing Down Payment: 20% on Median Home Price',
        description: 'Median home price $450,000 x 20% down payment = $90,000 needed upfront. Assuming 20% savings rate from income, minus existing debt payments (10% of income cap). Math: If annual income $50,000, savings capacity $10,000/year, minus $5,000 debt payments = $5,000 actual savings. $90,000 ÷ $5,000 = 18 years to save for down payment. Median home price from National Association of Realtors Q3 2024 data.',
        url: 'https://www.nar.realtor/research-and-statistics/housing-statistics/existing-home-sales',
        type: 'calculation'
      },
      {
        id: 'child-cost-usda-official',
        title: 'Cost of Raising a Child (USDA Official Data)',
        description: 'USDA official estimate: $233,610 to raise a child born in 2015 to age 17. When adjusted for current inflation, this equals approximately $300,000 total or $16,667 per year. Includes housing, food, childcare, healthcare, clothing, and education costs (excludes college). The USDA stopped updating these reports after 2017 due to methodology concerns.',
        url: 'https://www.fns.usda.gov/research/cnpp/expenditures-children-families',
        type: 'data'
      },
      {
        id: 'fertility-decline-acog-official',
        title: 'Female Fertility Decline by Age (ACOG)',
        description: 'American College of Obstetricians and Gynecologists: Female fertility decreases gradually starting at age 32, more rapidly after age 37. By age 40, only 1 in 10 women will get pregnant per menstrual cycle (vs 1 in 4 for women in their 20s). Women over 35 should receive expedited fertility evaluation after 6 months of trying.',
        url: 'https://www.acog.org/womens-health/faqs/having-a-baby-after-age-35-how-aging-affects-fertility-and-pregnancy',
        type: 'study'
      },
      {
        id: 'fertility-decline-medical-consensus',
        title: 'Age-Related Fertility Decline: Medical Committee Opinion',
        description: 'ACOG Committee Opinion No. 589: "The fecundity of women decreases gradually but significantly beginning approximately at age 32 years and decreases more rapidly after age 37 years." This is the official medical consensus from the leading obstetrics and gynecology organization.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/24553169/',
        type: 'study'
      },
      {
        id: 'social-security-insolvency',
        title: 'Social Security Trust Fund Depletion: Official Trustee Report',
        description: 'Social Security Trustees officially project trust fund depletion by 2034, with automatic benefit cuts to 77% of promised levels. For anyone under 50, Social Security will provide significantly reduced benefits or none at all. This requires personal retirement savings of 20x annual income instead of traditional 10-12x.',
        url: 'https://www.ssa.gov/OACT/TR/2023/tr2023.pdf',
        type: 'study'
      },
      {
        id: 'trinity-study-retirement-calculation',
        title: 'Trinity Study: 19x Income for Retirement (25x Expenses)',
        description: 'The Trinity Study established the 4% safe withdrawal rate, requiring 25x annual expenses. Since expenses typically equal 75% of income, this translates to 19x annual income (25 × 0.75 = 18.75, rounded to 19). Traditional 10-12x advice assumed Social Security + pensions, which no longer exist for most workers.',
        url: 'https://en.wikipedia.org/wiki/Trinity_study',
        type: 'study'
      },
      {
        id: 'debt-income-ratio-federal-guideline',
        title: 'Federal Student Loan Payment Cap: 10% of Discretionary Income',
        description: 'Federal income-driven repayment plans cap payments at 10% of discretionary income. For calculation purposes, we use 10% of gross income as maximum sustainable debt payment. This payment level severely impacts ability to save for house down payment and retirement contributions.',
        url: 'https://studentaid.gov/manage-loans/repayment/plans/income-driven',
        type: 'source'
      }
    ]
  },
  {
    pageId: 'seek-understanding',
    references: [
      {
        id: 'productivity-pay-gap-epi',
        title: 'Productivity-Pay Gap: EPI Analysis (1979-2020)',
        description: 'Economic Policy Institute comprehensive study showing productivity increased 70% while wages increased only 12% from 1979-2020. This is the authoritative source for the productivity-wage divergence that began in the 1970s.',
        url: 'https://www.epi.org/productivity-pay-gap/',
        type: 'study'
      },
      {
        id: 'nixon-shock-1971',
        title: 'Nixon Shock: End of Gold Standard (August 15, 1971)',
        description: 'Federal Reserve history of Nixon\'s decision to end the Bretton Woods system and remove the US dollar from the gold standard. This marked the beginning of the modern fiat monetary system.',
        url: 'https://www.federalreservehistory.org/essays/gold-convertibility-ends',
        type: 'source'
      },
      {
        id: 'cantillon-effect-explanation',
        title: 'The Cantillon Effect: How Money Printing Creates Inequality',
        description: 'Named after 18th-century economist Richard Cantillon, this effect describes how new money benefits those who receive it first (banks, government, corporations) while harming those who receive it last (wage earners). Academic research paper demonstrating how central bank monetary policy creates wealth inequality through the non-neutral distribution of new money.',
        url: 'https://mpra.ub.uni-muenchen.de/116787/1/money%20inequality.pdf',
        type: 'study'
      },
      {
        id: 'money-supply-growth-fed',
        title: 'US Money Supply Growth (M2) - Federal Reserve Data',
        description: 'Federal Reserve Economic Data (FRED) showing dramatic acceleration in money supply growth, especially after 2008 and 2020. M2 money supply increased from $1.6T in 1980 to over $21T by 2024.',
        url: 'https://fred.stlouisfed.org/series/M2SL',
        type: 'data'
      },
      {
        id: 'asset-price-inflation-calculation',
        title: 'Asset Price Inflation vs Wage Growth Calculation',
        description: 'Comparison of asset price growth vs wage growth since 1971. S&P 500: 1971 = 100, 2024 = 5,000+ (50x increase). Median wage: 1971 = $7,000, 2024 = $50,000 (7x increase). Assets outpaced wages 7:1, explaining wealth inequality.',
        url: '#asset-wage-divergence',
        type: 'calculation'
      },
      {
        id: 'inflation-understated-shadowstats',
        title: 'Real Inflation vs Official CPI: Alternative Calculations',
        description: 'Analysis showing how government inflation calculations have been methodologically changed since the 1980s to understate true inflation. Using 1980s methodology, real inflation is significantly higher than reported CPI.',
        url: 'http://www.shadowstats.com/alternate_data/inflation-charts',
        type: 'study'
      },
      {
        id: 'bretton-woods-system-history',
        title: 'Bretton Woods System: Gold Standard Era (1944-1971)',
        description: 'Historical overview of the Bretton Woods international monetary system where currencies were pegged to gold. This system constrained money printing and maintained price stability until its collapse in 1971.',
        url: 'https://www.investopedia.com/terms/b/brettonwoodsagreement.asp',
        type: 'source'
      }
    ]
  },
  {
    pageId: 'same-rules',
    references: [
      {
        id: 'deflation-under-gold-standard',
        title: 'Deflation and Prosperity: US Gold Standard Era (1879-1914)',
        description: 'During the classical gold standard period, the US experienced mild deflation (~1% annually) while achieving the highest economic growth in its history. Prices fell as productivity improved, making goods more affordable for workers. This demonstrates that deflation can coexist with prosperity when money supply is fixed.',
        url: 'https://www.nber.org/papers/w3410',
        type: 'study'
      },
      {
        id: 'productivity-gains-capture',
        title: 'Who Captures Productivity Gains: Workers vs Asset Owners',
        description: 'Federal Reserve research showing that productivity gains since 1971 have disproportionately benefited asset owners rather than workers. Under hard money systems, productivity improvements translate to lower prices (deflation), benefiting all consumers equally.',
        url: 'https://www.federalreserve.gov/econres/feds/files/2018001pap.pdf',
        type: 'study'
      },
      {
        id: 'hard-money-calculation',
        title: 'Hard Money Purchasing Power Calculation',
        description: 'Math: 35% hard money appreciation - 10% fiat inflation = 25% net advantage annually. Over 10 years: (1.25)^10 = 9.3x purchasing power multiplier. Example: $2,000 monthly expenses become $214/month in purchasing power terms. This represents the mathematical advantage of holding hard money during fiat debasement.',
        url: '#hard-money-math',
        type: 'calculation'
      },
      {
        id: 'fixed-supply-money-properties',
        title: 'Properties of Fixed-Supply Money Systems',
        description: 'Economic analysis of monetary systems with fixed supply constraints. Shows how fixed money supply eliminates Cantillon effects, creates equal rules for all participants, and allows productivity gains to benefit consumers through lower prices rather than being captured by those closest to money creation.',
        url: 'https://mises.org/library/theory-money-and-credit',
        type: 'study'
      }
    ]
  }
];

// Helper function to get references for a specific page
export const getPageReferences = (pageId: string): Reference[] => {
  const page = pageReferences.find(page => page.pageId === pageId);
  return page ? page.references : [];
}; 