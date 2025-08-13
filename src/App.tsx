```typescript
import React from 'react';

function App() {
  console.log('App.tsx is rendering: Hello World!'); // Debugging log
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '3em', color: 'blue' }}>
      Hello from Deployed App!
    </div>
  );
}

export default App;
```