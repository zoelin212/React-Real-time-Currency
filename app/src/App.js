import './App.css';
import { Route, Routes } from 'react-router-dom';
import Converter from './components/Converter';
import Average from './components/Average';


function App() {
  return (
    <div className="App">
      <h1 className="logoBox">
        <img src="./logo/logo.png" alt="Logo" className="logo"/>
      </h1>
      <Routes>
            <Route path="/" element={<Converter />}/>
            <Route path="average" element={<Average />}/>
      </Routes>
      <footer>
        <p>@copyright - Zoe Lin || Exchange rate data provided by the <a href='https://tw.rter.info/howto_currencyapi.php'>Rter.info</a> API.</p>
      </footer>
    </div>
  );
}

export default App;
