import './App.css';
import { Routes, Route } from "react-router-dom";
import AllArticles from './components/AllArticles.js';
import SingleArticle from './components/SingleArticle.js';
import Crud from './components/Crud.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<AllArticles/>}></Route>
        <Route path='/article/:id' element={<SingleArticle/>}></Route>
        <Route path='/crud' element={<Crud/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
