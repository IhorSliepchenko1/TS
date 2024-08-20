import { createContext, useCallback, useContext, useState } from "react";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../api";
import { ApiContextType, Page, Todos } from "../types/index";

type Props = {
  children: React.ReactNode;
};

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ContextApi = ({ children }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Todos[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(50);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<Todos | null>(null);

  const [sortedData, setSortedData] = useState<Todos[]>([]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

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
        setSortedData(response.data);
        setLoading(false);
      } catch (error) {
        setError((error as AxiosError).message);
      }
    };

    fetchData();
  }, [limit, page]);

  const sortData = () => {
    const sorted = [...data].sort((a, b) => {
      const aCompleted = a.completed ? 1 : 0;
      const bCompleted = b.completed ? 1 : 0;
      return sortDirection === "asc"
        ? aCompleted - bCompleted
        : bCompleted - aCompleted;
    });
    setSortedData(sorted);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const fetchUser = async (id: number | string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<Todos>(`${BASE_URL}/${id}`);

      setUser(response.data);
      setLoading(false);
    } catch (error) {
      setError((error as AxiosError).message);
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
        data: sortedData,
        page,
        limit,
        pageManipulation,
        limitManipulation,
        fetchUser,
        error,
        user,
        sortDirection,
        sortData,
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
