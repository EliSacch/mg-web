// hooks
import { useState } from 'react';
// components
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutWithHeader from './layouts/LayoutWithHeader';
import LayoutWithoutHeader from './layouts/LayoutWithoutHeader';
import LayoutForAdmin from './layouts/LayoutForAdmin';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Message from './components/Message';
import Modal from './components/Modal';
// style
import './App.css';
import Admin from './pages/Admin';


function App() {

  const [showModal, setShowModal] = useState(false);
  const [modalChildren, setModalChildren] = useState(<p>hi</p>);

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
          <Routes>

            <Route element={
              <LayoutWithHeader
                handleOpen={handleOpen}
                handleClose={handleClose}
                setModalChildren={setModalChildren}
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
                handleClose={handleClose}
                setModalChildren={setModalChildren}
              />
            }>
              <Route path="/test" element={<p>Test page</p>} />
              <Route path="/login" element={
                <Login />
              } />
              <Route path="/signup" element={<Signup />} />
            </Route>

            <Route element={
              <LayoutForAdmin
                handleOpen={handleOpen}
                handleClose={handleClose}
                setModalChildren={setModalChildren}
              />
            }>
              <Route path="/admin" element={<Admin />} />
            </Route>

          </Routes>

          {showModal && (
            <Modal children={modalChildren} handleClose={handleClose} showModal={showModal} />
          )}
        </BrowserRouter>

        <Message />

      </>
    </div>
  );
}

export default App;