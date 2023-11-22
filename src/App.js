import "./App.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import Layout from "./components/Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const router = createBrowserRouter([{ path: "", element: <Layout /> }]);
  return (
    <RouterProvider router={router}>
      <div className="App">
        <Layout />
      </div>
    </RouterProvider>
  );
}

export default App;
