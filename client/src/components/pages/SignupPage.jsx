import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createUser } from "../../redux/features/application";
import styles from './signuppage.module.css'

export default function SignupPage() {

const dispatch = useDispatch()

const [login, setLogin] = useState("")
const [password, setPassword] = useState("")


const signingUp = useSelector(state => state.application.signingUp)
const error = useSelector(state => state.application.error)


const handleChangeLogin = (e) => {
setLogin(e.target.value);
}

const handleChangePassword = (e) => {
setPassword(e.target.value);
}

const handleSubmit = () => {
dispatch(createUser({login, password}))
}

  return (
    <div>
    <Link to='/signin' className={styles.authButton}>Авторизация</Link>
    <div className={styles.SignupPage}>
    <div>
        {error}
      <div>
        <input
          type="text"
          placeholder="type login"
          value={login}
          onChange={handleChangeLogin}
          className={styles.signingUpLogin}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="type password"
          value={password}
          onChange={handleChangePassword}
          className={styles.signingUpPassword}
        />
      </div>
      <button onClick={handleSubmit}
       disabled={signingUp}
       className={styles.btnSigningup}
       >
        регистрация
      </button>
    </div>
    </div>
    </div>
  );
}
