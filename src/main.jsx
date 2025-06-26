import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router";
import { router } from './router/Routes';
import { ToastContainer } from 'react-toastify';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import AuthProvider from './provider/AuthProvider';
AOS.init();

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <div className='max-w-7xl mx-auto font-urbanist'>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ToastContainer/>
            <RouterProvider router={router}/>  
          </AuthProvider>
        </QueryClientProvider>   
      </div>
  </StrictMode>,
)
