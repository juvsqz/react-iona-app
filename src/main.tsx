import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppContextProvider } from './contexts/AppContext'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import routes from './routes';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      { routes.map(({ element: Element, path}, index)=> { 
        return <Route key={index} index={index < 1} path={path} element={<Element/> }/>
      })}
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </React.StrictMode>,
)
