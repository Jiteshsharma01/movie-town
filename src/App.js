import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.scss";
import Body from "./components/Body/Body";
import MainContainer from "./components/Body/MainContainer";
import { store } from "./utils/store";
import { Provider } from "react-redux";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import MovieDetailContainer from "./components/MovieContainer/MovieDetailContainer";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Body />}>
      <Route index element={<MainContainer />} />
      <Route path={"movie"} element={<MovieDetailContainer />}>
        <Route path=":id" element={<MovieDetail />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
