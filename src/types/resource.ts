export type ResourceTopic =
  | 'topic1'
  | 'topic2'
  | 'topic3'
  | 'topic4'
  | 'topic5'
  | 'topic6'
  | 'topic7'
  | 'topic8'
  | 'topic9';

export type ResourceItem = {
  label: string;
  url: string;
};

export type ResourceGroup = {
  title: string;
  items: ResourceItem[];
};

export type TopicResources = {
  groups: ResourceGroup[];
};
