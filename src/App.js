import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserCart from './views/UserCart';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<UserCart/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
