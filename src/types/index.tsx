export type Todos = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type ApiContextType = {
  loading: boolean;
  data: Todos[];
  user: Todos | null;
  page: number;
  limit: number;
  pageManipulation: Page;
  fetchUser: (id: number | string) => void;
  limitManipulation: (limit: number) => void;
  error: string | null;
  sortData: () => void;
  sortDirection: "asc" | "desc";
};

export type Page = {
  firstPage: () => void;
  lastPage: () => void;
  nextPage: () => void;
  prevPage: () => void;
  specificPage: (page: number) => void;
};
