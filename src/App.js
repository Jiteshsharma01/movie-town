import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.scss';
import Body from './components/Body';
import MainContainer from './components/MainContainer';

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Body />}>
      <Route index element={<MainContainer />} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={appRouter} />
  );
}


export default App;
