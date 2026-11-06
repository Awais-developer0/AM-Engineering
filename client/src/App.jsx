import React from 'react';
import Routes from './pages/Routes';
import { AuthProvider } from './context/AuthContext';

import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen font-sans selection:bg-brand-blue selection:text-white">
          <Routes />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
