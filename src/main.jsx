import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router";
import { router } from './router/Routes';
import { ToastContainer } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import AuthProvider from './provider/AuthProvider';
AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <div className='max-w-7xl mx-auto font-urbanist'>
        <AuthProvider>
          <ToastContainer/>
          <RouterProvider router={router}/>  
        </AuthProvider>  
      </div>
  </StrictMode>,
)
