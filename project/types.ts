interface Option {
  code: string;
  name: string;
}

interface University {
  key: string;
  name: string;
  state: string;
  website: string[];
}

interface APIPerformance {
  status: number;
  executionTime: number | null;
}


interface APIBody {
  items: University[];
  apiPerformance: APIPerformance;
}