import { useApiData } from "../../contextApi";
import { FaEye } from "react-icons/fa";
import style from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/error";
import Spiner from "../../components/spiner";
import { FaSortDown } from "react-icons/fa";
import Pagination from "../../components/pagination";

const MainPage = () => {
  const { data, loading, error, sortData, sortDirection } = useApiData();

  const navigate = useNavigate();

  return (
    <div className={style.main}>
      {loading ? (
        <Spiner />
      ) : (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th className={style.th_completed} onClick={sortData}>
                <span>completed</span>
                <FaSortDown
                  style={{
                    cursor: `pointer`,
                    transform:
                      sortDirection === "asc" ? "rotate(180deg)" : "none",
                  }}
                />
              </th>
              <th>title</th>
              <th>userId</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((todo) => (
              <tr
                key={todo.id}
                style={{
                  background:
                    todo.userId % 2 === 0 ? `rgb(173 173 173 / 30%)` : `white`,
                }}
              >
                <td>
                  <button
                    className={style.btn}
                    onClick={() => navigate(`/user/${todo.id}`)}
                  >
                    <span> {todo.id}</span>
                    <FaEye />
                  </button>
                </td>
                <td style={{ color: todo.completed ? `green` : `red` }}>
                  {todo.completed ? `выполнено` : `не выполнено`}
                </td>
                <td>{todo.title}</td>
                <td>{todo.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Pagination />
      <ErrorMessage error={error} />
    </div>
  );
};

export default MainPage;
