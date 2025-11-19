import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry : 3,
      staleTime: 5 * 60 * 1000
    },
    mutations: {
      retry : 1
    }
  }
})

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
); 
