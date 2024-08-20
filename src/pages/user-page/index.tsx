import { useNavigate, useParams } from "react-router-dom";
import style from "./index.module.scss";
import { useEffect } from "react";
import { useApiData } from "../../contextApi";

const UserPage = () => {
  const { id } = useParams();
  const { fetchUser, user, loading, error } = useApiData();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchUser(id);
    }
  }, [id]);

  return loading ? (
    `loading...`
  ) : (
    <div className={style.main}>
      <div className={style.btn_container}>
        <button className={style.main_page} onClick={() => navigate(`/`)}>
          на главную
        </button>
        <div className={style.btn_slot}>
          <button
            className={style.prev}
            onClick={() =>
              navigate(Number(id) > 1 ? `/user/${Number(id) - 1}` : `/`)
            }
          >{`< назад`}</button>
          <span className={style.id}>{id}</span>
          <button
            className={style.next}
            onClick={() => navigate(`/user/${Number(id) + 1}`)}
          >{`вперёд >`}</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>completed</th>
            <th>title</th>
            <th>userId</th>
          </tr>
        </thead>

        {error ? (
          error
        ) : (
          <tbody>
            <tr>
              <td>{user?.id}</td>
              <td style={{ color: user?.completed ? `green` : `red` }}>
                {user?.completed ? `выполнено` : `не выполнено`}
              </td>
              <td>{user?.title}</td>
              <td>{user?.userId}</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default UserPage;
