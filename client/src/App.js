import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Login from './views/Auth/Login';
import Register from './views/Auth/Register';
import Home from './views/Home/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Messages from './views/Messages/Messages';
import { useSelector } from 'react-redux';

function App() {

  const user = useSelector(state => state.user.currentUser);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={user ? <Navigate to='/messages' /> : <Home />} />
          <Route path='/register/:identifier' element={!user ? <Register /> : <Navigate to='/messages' />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/messages' />} />
          <Route path='/messages' element={!user ? <Navigate to='/' /> : <Messages />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
