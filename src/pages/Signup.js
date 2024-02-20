// hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// context
import { useCurrentUser } from '../context/CurrentUserContext';
// components
import Input from '../components/form/Input';
// style
import formStyles from './styles/Forms.module.css';
import btnStyles from './styles/Buttons.module.css';


export default function Signup() {

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const { currentUser } = useCurrentUser();

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, displayName);
  }

  useEffect(() => {
    if (currentUser) {
      navigate("/");
      return
    }
  }, [currentUser, navigate])

  return (
    <main>
      <section className={formStyles.FormContainer}>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit} className={formStyles.Form}>

          <Input
            id="name"
            title="Nome"
            type="text"
            name="name"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
            placeholder="Scegli un nome"
          />

          <Input
            id="email"
            title="Email"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="La tua email"
            autoComplete="email-new"
          />

          <Input
            id="password"
            title="Password"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="La tua password"
            autoComplete="password-new"
          />

          <Input
            id="password2"
            title="Ripeti la password"
            type="password"
            name="password2"
            onChange={(e) => setPassword2(e.target.value)}
            value={password2}
            placeholder="Ripeti la password"
          />

          <button id="signup" className={btnStyles.Btn}>Sign up</button>

        </form>
      </section>
    </main>
  )
}
