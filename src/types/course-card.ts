type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'success'
  | 'warning'
  | 'danger';

export type CourseCardBadge = {
  variant: BadgeVariant;
  icon: string;
  label: string;
};

export type CourseCard = {
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  triggerId: string;
  badges: CourseCardBadge[];
};
