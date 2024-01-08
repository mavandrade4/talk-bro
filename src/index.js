import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import WorkPage from './components/work_page/work_page';
import TeamPage from './components/team_page/team_page';
import SearchPage from './components/search_page/search_page';
import Root from './components/root';
import './index.css';

import anime from 'animejs';

import LocomotiveScroll from 'locomotive-scroll';



const router = createBrowserRouter([
  {
    path: "/talk-bro/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: "/talk-bro/work",
        element: <WorkPage />,
      },
      {
        path: "/talk-bro/team",
        element: <TeamPage />,
      },
      {
        path: "/talk-bro/search",
        element: <SearchPage />,
      },
    ]
  },
 
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
