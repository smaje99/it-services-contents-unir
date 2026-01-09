type Development =
  | string
  | {
      intro: string;
      steps: string[];
      outro: string;
    };

export interface CaseStudy {
  title: string;
  description: string;
  development: Development;
  lessons: string;
}
