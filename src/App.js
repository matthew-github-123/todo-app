import './App.css';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Body from './components/Body/Body';

import Login from './components/Login/Login';

import { useStateValue } from './StateProvider';

function App() {

  const [{ user }, dispatch] = useStateValue();
  
  return (
    <div className="app">
      {!user ? (
         <Login />
      ) : (
      <>
      <Header />
      <div className="app__body">
        <Sidebar />
        <Body />        
      </div>
      </>
    )}
    </div>
  );
}

export default App;



  