export type Issue = {
  id: number;
  title: string;
  state: 'open' | 'closed';
  labels: string[];
};

export type Repo = {
  full_name: string;
};
