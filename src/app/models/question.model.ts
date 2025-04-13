export interface Question {
    id: string;
    text: string;
    type: 'text' | 'radio' | 'checkbox';
    options?: string[];
  }
  