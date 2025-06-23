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

export type HeroStep = 
  | 'landing'
  | 'question-everything'
  | 'time-has-value'
  | 'seek-understanding'
  | 'same-rules'
  | 'heros-triumph'; 