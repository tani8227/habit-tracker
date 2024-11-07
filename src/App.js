
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home } from './components/Home'; 
import TrackHabit from './components/TrackHabit';

// main component

function App()
{
  const router=createBrowserRouter([
    {
        path:'/',
        element:<Home/>,

    },
    {
      path:'trackHabit',
      children:
      [
        {
          path:':id',
          element:<TrackHabit/>,
 
        }
      ]
    }
  ])


  return (

    <RouterProvider router={router} />
  );
}

export default App;
