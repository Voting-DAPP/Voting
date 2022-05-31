import './App.css';
import { Routes , Route} from 'react-router-dom';
import HomePage from './page/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from './page/Admin';



function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>} /> 
        <Route path="/admin" element={<Admin/>} /> 
      </Routes>
    </div>
  );
}

export default App;
