import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {Restaurant} from "./Restaurant.jsx"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "/restaurants/:id",
    element: <Restaurant/>
  }
]);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
    <RouterProvider router={router}/>
    </ThemeProvider>
  </StrictMode>,
)
