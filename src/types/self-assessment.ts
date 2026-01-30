import type { TopicId } from './topic';

export type SelfAssessmentQuestion = {
  id: `${TopicId}-question-${number}`;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
};

export type SelfAssessment = {
  title: string;
  questions: SelfAssessmentQuestion[];
};

export type SelfAssessmentsByTopic = Record<TopicId, SelfAssessment>;
