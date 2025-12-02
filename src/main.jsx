
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ViewStory from './ViewStory.jsx'
import Profile from  './Profile.jsx'
import Messages from './Message.jsx'
import Reel from './Reel.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router=createBrowserRouter(
[
  {
    path:'/',
    element:<App/>
  },{
    path:'story/:id',
    element:<ViewStory/>
  },
  {
    path:'Profile',
    element:<Profile/>
  },{
    path:'messages',      
    element:<Messages/>
  },
  {
    path:'reels',
    element:<Reel/>
  }
]);

createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router}/>
  
)

