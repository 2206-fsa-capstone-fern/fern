import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Plaid from './Plaid';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Navbar />
          <Plaid />
          <Routes>
            <Route exact path='/login' element={<LogIn />} />
            <Route exact path='/signup' element={<SignUp />} />

            <Route path='/link' element={<Plaid />} />
            <Route exact path='/dashboard' element={<Dashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
