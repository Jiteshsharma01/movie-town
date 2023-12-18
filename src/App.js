import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.scss';
import Body from './components/Body/Body';
import MainContainer from './components/Body/MainContainer';
import { store } from "./utils/store";
import { Provider } from 'react-redux';

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Body />}>
      <Route index element={<MainContainer />} />
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
