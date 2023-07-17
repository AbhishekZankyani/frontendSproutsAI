import logo from './logo.svg';
import './App.css';
import { Routes, Route,Switch } from 'react-router-dom';
import LoginPage from './auth/Login';
import SignUPPage from './auth/SignUp';
import Dashboard from './dashboard/Dashboard';
// import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';

const App =()=> {



  return(
    <>  
    <Routes>
      
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/SignUp' element={<SignUPPage/>}/>
    </Routes>
    </>
  );
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
