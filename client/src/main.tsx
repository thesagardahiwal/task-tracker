import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import App from './App.tsx';
import { queryClient } from './lib/queryClient.ts';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster position="bottom-right" richColors />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
