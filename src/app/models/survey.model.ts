export interface Survey {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  creatorName: string;
  questionIds: string[];
  tags?: string[];
}

  