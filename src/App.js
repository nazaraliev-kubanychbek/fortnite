
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import './style.scss'
import Skin from './components/Skin/Skin';
import Contact  from './components/Contact/Contact';

function App() {

  return (
    <>
 <BrowserRouter>
 <Header/>
 <Routes>
  <Route path='/' element={<Home/>} />
  <Route path='/cart' element={<Cart/>} />
  <Route path='/contact' element={<Contact/>}/>
  <Route path='/skin/:id' element={<Skin/>} />
 </Routes>
 </BrowserRouter>
    </>
  );
}

export default App;
