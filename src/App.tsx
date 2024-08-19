import { useApiData } from "./contextApi";

const App = () => {
  const {
    loading,
    data,
    page,
    // limit,
    pageManipulation,
    // limitManipulation,
    error,
  } = useApiData();
  console.log(data);

  console.log(error);

  return (
    <>
      <div>{loading ? `loading...` : `end loading...`}</div>
      <button onClick={() => pageManipulation.nextPage()}>next</button>
      <span>{page}</span>
      <button onClick={() => pageManipulation.prevPage()}>prev</button>
    </>
  );
};

export default App;
