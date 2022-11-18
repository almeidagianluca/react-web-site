import './App.css';
import Header from './components/Header'
import Rotas from './Rotas';

import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className='app'>
      <Header/>
      <Rotas/>
    </div>
    </BrowserRouter>
  );
}

export default App;
