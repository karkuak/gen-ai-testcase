
export interface TestScenario {
  id: string;
  title: string;
  steps: string[];
  expectedResult: string;
  type: 'Positive' | 'Negative' | 'Edge Case';
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
  scenarios: TestScenario[];
}
