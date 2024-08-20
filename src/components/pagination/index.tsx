import { useApiData } from "../../contextApi";
import Button from "../button";
import style from "./index.module.scss";
const Pagination = () => {
  const { pageManipulation, page, data, limit } = useApiData();

  const totalPages = Math.ceil(200 / limit);

  const arryNumber: number[] = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );

  return (
    <div className={style.btn_container}>
      <Button
        onClick={() => pageManipulation.firstPage()}
        number={`<<`}
        disabled={page === 1 ? true : false}
      />
      <Button
        onClick={() => pageManipulation.prevPage()}
        number={`<`}
        disabled={page === 1 ? true : false}
      />
      {arryNumber.map((number) => (
        <Button
          onClick={() => pageManipulation.specificPage(number)}
          number={number}
          disabled={false}
        />
      ))}

      <Button
        onClick={() => pageManipulation.nextPage()}
        number={`>`}
        disabled={data[data.length - 1]?.id === 200 ? true : false}
      />
      <Button
        onClick={() => pageManipulation.lastPage()}
        number={`>>`}
        disabled={data[data.length - 1]?.id === 200 ? true : false}
      />
    </div>
  );
};

export default Pagination;
