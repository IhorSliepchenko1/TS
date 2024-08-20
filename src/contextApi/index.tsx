import { createContext, useCallback, useContext, useState } from "react";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../api";
import { Todos } from "../types/index";

type Props = {
  children: React.ReactNode;
};
type ApiContextType = {
  loading: boolean;
  data: Todos[];
  user: Todos | null;
  page: number;
  limit: number;
  pageManipulation: Page;
  fetchUser: (id: number | string) => Promise<void>;
  limitManipulation: (limit: number) => void;
  error: string | null;
};
type Page = {
  firstPage: () => void;
  lastPage: () => void;
  nextPage: () => void;
  prevPage: () => void;
  specificPage: (page: number) => void;
};

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ContextApi = ({ children }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Todos[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(50);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<Todos | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Todos[]>(BASE_URL, {
          params: {
            _limit: limit,
            _page: page,
          },
        });

        setData(response.data);
      } catch (error) {
        setError((error as AxiosError).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit, page]);

  const fetchUser = async (id: number | string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<Todos>(`${BASE_URL}/${id}`);

      setUser(response.data);
    } catch (error) {
      setError((error as AxiosError).message);
    } finally {
      setLoading(false);
    }
  };

  const pageManipulation: Page = {
    firstPage: useCallback(() => setPage(1), []),
    lastPage: useCallback(() => setPage(200), []),
    nextPage: useCallback(() => setPage((prev) => (prev += 1)), []),
    prevPage: useCallback(() => setPage((prev) => (prev -= 1)), []),

    specificPage: useCallback((pageNumber) => {
      if (pageNumber > 0) {
        setPage(pageNumber);
      }
    }, []),
  };

  const limitManipulation = (limit: number) => {
    setLimit(limit);
  };

  return (
    <ApiContext.Provider
      value={{
        loading,
        data,
        page,
        limit,
        pageManipulation,
        limitManipulation,
        fetchUser,
        error,
        user,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApiData = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error("данные отсутствуют!");
  }
  return context;
};
