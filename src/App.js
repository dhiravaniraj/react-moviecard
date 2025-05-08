import "./css/App.css";
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { MovieProvider } from "./context/MovieContext";

function App() {

  const movienumber = 1;

  return (
    <MovieProvider>
      <Navbar />
   <main className='main-content'> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
   </main>
    </MovieProvider>
  );
}

export default App;
