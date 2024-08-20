import { useApiData } from "../../contextApi";
import { FaEye } from "react-icons/fa";
import style from "./index.module.scss";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const { data, loading, error } = useApiData();

  const navigate = useNavigate();

  return (
    <div className={style.main}>
      {loading ? (
        `loading...`
      ) : error ? (
        <>{error}</>
      ) : (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>completed</th>
              <th>title</th>
              <th>userId</th>
            </tr>
          </thead>

          <div>{error} </div>

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
    </div>
  );
};

export default MainPage;
