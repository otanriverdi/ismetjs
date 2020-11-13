export type Issue = {
  number: number;
  title: string;
  state: 'open' | 'closed';
  labels: string[];
};

export type Repo = {
  full_name: string;
};
