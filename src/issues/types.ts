export type Issue = {
  number: number;
  title: string;
  state: 'open' | 'closed';
  labels: string[];
  body: string;
};

export type IssueUpdate = {
  number: number;
  updates?: {
    title?: string;
    body?: string;
  };
};

export type IssueCreate = {
  title: string;
  body: string;
};

export type Repo = {
  full_name: string;
};
