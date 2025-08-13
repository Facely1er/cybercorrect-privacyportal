```typescript
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

console.log('main.tsx is executing'); // Debugging log

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found!'); // Debugging log for missing root
  // Fallback for debugging: display a message directly if root is missing
  document.body.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: sans-serif; font-size: 24px; color: red;">Application failed to load: Root element missing. Check console for details.</div>';
} else {
  const root = createRoot(rootElement);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
```