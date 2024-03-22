export interface Option {
  code: string;
  name: string;
}

export interface University {
  key: string;
  name: string;
  state: string;
  website: string[];
}

export interface APIPerformance {
  status: number;
  executionTime: number | null;
}


export interface APIBody {
  items: University[];
  apiPerformance: APIPerformance;
}