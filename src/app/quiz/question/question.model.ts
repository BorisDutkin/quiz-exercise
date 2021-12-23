export interface Question {
  index?: number;
  question: string;
  answers: { title: string; correct: boolean }[];
}
