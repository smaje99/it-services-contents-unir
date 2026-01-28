export type CaseStudyTopic =
  | 'topic1'
  | 'topic2'
  | 'topic3'
  | 'topic4'
  | 'topic5'
  | 'topic6'
  | 'topic7'
  | 'topic8'
  | 'topic9';

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
  isNational?: boolean;
  icon?: string;
  development: Development;
  lessons: string;
}

export type FrameworkRef = {
  name: 'COBIT' | 'ITIL' | 'ISO 38500' | 'Val IT' | 'ISO 27001' | 'ISO/IEC 20000';
  icon?: string;
  focus: string;
  typicalUse: string[];
  keyArtifacts: string[];
};

export type Principle = {
  name:
    | 'Responsibility'
    | 'Strategy'
    | 'Acquisition'
    | 'Performance'
    | 'Conformance'
    | 'Human Behaviour';
  application: string;
  deliverableExamples: string[];
};

export type DomainInAction = {
  domain: 'PO' | 'AI' | 'ES' | 'SE';
  description: string;
  examples: string[];
};

export type ApplicationByPhase = {
  phase: 'Strategy' | 'Design' | 'Transition' | 'Operation' | 'Continual Improvement';
  description: string;
  deliverables: string[];
};

export type SectorApplication = {
  sector: string;
  applications: string[];
};

export interface TopicContent {
  caseStudies: CaseStudy[];
  frameworks?: FrameworkRef[];
  principles?: Principle[];
  benefits?: string[];
  domains?: DomainInAction[];
  applicationsByPhase?: ApplicationByPhase[];
  sectorApplications?: SectorApplication[];
}
