import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CategoryList from "./components/CategoryList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <CategoryList />
    </div>
  );
}

export default App;