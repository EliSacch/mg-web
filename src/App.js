// hooks
import { useState } from 'react';
import { useSetCurrentMessage, useSetCurrentMessageType } from './context/MessageContext';

// components
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Message from './components/Message';
import Modal from './components/Modal';
// style
import './App.css';

function App() {

  const [jwtToken, setJwtToken] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalChildren, setModalChildren] = useState(<p>hi</p>);
  const setCurrentMessage = useSetCurrentMessage();
  const setCurrentMessageType = useSetCurrentMessageType();


  const handleClose = () => {
    setShowModal(false);
  }

  const handleOpen = () => {
    setShowModal(true);
  }


  return (
    <div className="App">
      <>
        <BrowserRouter>
          <header>
            <Navigation
              handleOpen={handleOpen}
              handleClose={handleClose}
              setModalChildren={setModalChildren}
              jwtToken={jwtToken}
              setJwtToken={setJwtToken}
              setCurrentMessage={setCurrentMessage}
              setCurrentMessageType={setCurrentMessageType}
            />
          </header>
          <main>
            <Routes>
              <Route
                path="/"
                element={<Home />} />
              <Route path="/login" element={<Login setJwtToken={setJwtToken} />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>

          <footer>
            <Footer />
          </footer>
        </BrowserRouter>
        <Message />
        {showModal && (
          <Modal children={modalChildren} handleClose={handleClose} showModal={showModal} />
        )}
      </>
    </div>
  );
}

export default App;