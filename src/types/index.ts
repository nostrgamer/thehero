export interface UserData {
  hourlyWage?: number;
  yearlySalary?: number;
  savings?: number;
  expenses?: number;
  completedSteps: string[];
  currentStep: string;
  startedAt: Date;
}

export interface CalculationResult {
  timeToAffordHouse: number;
  timeToAffordCar: number;
  wealthTransferPerYear: number;
  bitcoinEquivalent: number;
  inflationImpact: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

export interface Reference {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'study' | 'data' | 'article' | 'calculation' | 'source';
}

export interface PageReferences {
  pageId: string;
  references: Reference[];
}

export type HeroStep = 
  | 'landing'
  | 'question-everything'
  | 'time-has-value'
  | 'seek-understanding'
  | 'same-rules'
  | 'hero-triumph'; 