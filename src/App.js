// hooks
import { useState } from 'react';
// components
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Modal from './components/Modal';
// style
import './App.css';
import styles from './components/styles/Modal.module.css';


function App() {

  const [jwtToken, setJwtToken] = useState("")
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(false);
    console.log("logging out")
  }

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
            <Navigation handleOpen={handleOpen} />
            </header>
            <main>
            <Routes>
              <Route
              path="/"
              element={<Home />}/>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
            </main>
            <footer>
              <Footer />
            </footer>
          </BrowserRouter>
          {showModal && (
            <Modal handleClose={handleClose} showModal={showModal} >
              <h2>Logout</h2>
              <p>Do you want to sign out?</p>
              <button onClick={handleLogout} className={styles.btn}>Confirm</button>
            </Modal>
          )}
        </>
    </div>
  );
}

export default App;