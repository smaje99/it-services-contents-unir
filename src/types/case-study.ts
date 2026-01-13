export type DevelopmentWithSteps = {
  intro: string;
  steps: string[];
  outro: string;
};

export type DevelopmentWithSituation = {
  situation: string; // párrafo
  problems: string[]; // lista
  solution: {
    summary: string; // párrafo corto
    modules: string[]; // lista
  };
  results: string; // párrafo
};

type Development = string | DevelopmentWithSteps | DevelopmentWithSituation;

export interface CaseStudy {
  title: string;
  description: string;
  development: Development;
  lessons: string;
}
