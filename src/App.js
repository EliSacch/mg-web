// hooks
import { useState } from 'react';
// context 
import { useCurrentUser } from './context/CurrentUserContext';
// components
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutWithHeader from './layouts/LayoutWithHeader';
import LayoutWithoutHeader from './layouts/LayoutWithoutHeader';
import LayoutForAdmin from './layouts/LayoutForAdmin';
import AdminDashboard from './pages/AdminDashboard';
import TreatmentForm from './pages/TreatmentForm';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Message from './components/Message';
import Modal from './components/Modal';
// style
import './App.css';
import Book from './pages/Book';


function App() {

  const [showModal, setShowModal] = useState(false);
  const [modalChildren, setModalChildren] = useState(<p>hi</p>);
  const { currentUser } = useCurrentUser();

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
              <Route path="/book" element={<Book />} />
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
              <Route path="/admin"
                element={<AdminDashboard
                  handleOpen={handleOpen}
                  handleClose={handleClose}
                  showModal={showModal}
                  setModalChildren={setModalChildren}
                />}
              />
              <Route path="/admin/treatments/create" element={<TreatmentForm is_new={true} />} />
              <Route path="/admin/treatments/:id/edit" element={<TreatmentForm is_new={false} />} />

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