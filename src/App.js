import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Suspense } from 'react'
import Dashboard from 'page/dashboard';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
