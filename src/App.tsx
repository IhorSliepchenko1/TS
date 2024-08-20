import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/main-page";
import UserPage from "./pages/user-page/index";
import { ContextApi } from "./contextApi";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/user/:id",
      element: <UserPage />,
    },
  ]);

  return (
    <ContextApi>
      <RouterProvider router={router} />
    </ContextApi>
  );
};

export default App;
