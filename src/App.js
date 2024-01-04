// hooks
import { useCallback, useEffect, useState } from 'react';
import { useSetCurrentMessage, useSetCurrentMessageType } from './context/MessageContext';

// components
import { BrowserRouter, Route, Routes, redirect, } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Message from './components/Message';
import Modal from './components/Modal';
// style
import './App.css';
import LayoutWithHeader from './pages/LayoutWithHeader';
import LayoutWithoutHeader from './pages/LayoutWithoutHeader';


function App() {

  const [jwtToken, setJwtToken] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalChildren, setModalChildren] = useState(<p>hi</p>);
  const setCurrentMessage = useSetCurrentMessage();
  const setCurrentMessageType = useSetCurrentMessageType();

  const [tickInterval, setTickInterval] = useState();

  const handleClose = () => {
    setShowModal(false);
  }

  const handleOpen = () => {
    setShowModal(true);
  }

  const handleLogout = () => {

    const requestOption = {
      method: "GET",
      credentials: "include",
    }

    fetch("/logout", requestOption)
      .catch(error => {
        console.log("error logging out.", error)
        handleClose();
        setCurrentMessageType("success");
        setCurrentMessage("A presto!");
      })
      .finally(() => {
        setJwtToken("")
        toggleRefresh(false);
        handleClose();
        redirect("/")
      })
  }

  const toggleRefresh = useCallback((status) => {

    if (status) {
      let i = setInterval(() => {
        const requestOption = {
          method: "GET",
          credentials: "include",
        }

        fetch('/refresh', requestOption)
          .then(res => res.json())
          .then(data => {
            if (data.access_token) {
              setJwtToken(data.access_token);
            }
          })
          .catch(error => {
            console.log("user not logged in. Could not refresh token")
          })
      }, 600000);
      setTickInterval(i);
    } else {
      setTickInterval(null);
      clearInterval(tickInterval);
    }
  }, [tickInterval])

  useEffect(() => {
    if (jwtToken === "") {
      const requestOption = {
        method: "GET",
        credentials: "include",
      }

      fetch('/refresh', requestOption)
        .then(res => res.json())
        .then(data => {
          if (data.access_token) {
            setJwtToken(data.access_token);
            toggleRefresh(true);
          }
        })
        .catch(error => {
          console.log("user not logged in. Could not refresh token", error)
        })
    }
  }, [jwtToken, toggleRefresh])

  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Routes>
            <Route element={
              <LayoutWithHeader
                handleOpen={handleOpen}
                handleLogout={handleLogout}
                setModalChildren={setModalChildren}
                jwtToken={jwtToken}
              />
            }>
              <Route
                path="/"
                element={<Home />}
              />
            </Route>
            <Route element={
              <LayoutWithoutHeader
                handleOpen={handleOpen}
                handleLogout={handleLogout}
                setModalChildren={setModalChildren}
                jwtToken={jwtToken}
              />
            }>
              <Route path="/test" element={<p>Test page</p>} />
              <Route path="/login" element={<Login setJwtToken={setJwtToken} toggleRefresh={toggleRefresh} />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Routes>
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