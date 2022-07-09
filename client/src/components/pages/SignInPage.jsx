import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../redux/features/application";
import styles from './signinpage.module.css'

export default function SignupPage() {

const dispatch = useDispatch()

const [login, setLogin] = useState("")
const [password, setPassword] = useState("")


const signingIn = useSelector(state => state.application.signingIn)
const error = useSelector(state => state.application.error)


const handleChangeLogin = (e) => {
setLogin(e.target.value);
}

const handleChangePassword = (e) => {
setPassword(e.target.value);
}

const handleSubmit = () => {
dispatch(auth({login, password}))
}

  return (
    <div>    <Link to='/signup' className={styles.authBtn}>Регистрация</Link>

    <div className={styles.SigninPage}>
    <div>
        {error}
      <div>
        <input
          type="text"
          placeholder="type login"
          value={login}
          onChange={handleChangeLogin}
          className={styles.signinLogin}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="type password"
          value={password}
          onChange={handleChangePassword}
          className={styles.signinPassword}
        />
      </div>
      <button onClick={handleSubmit}
       disabled={signingIn}
       className={styles.btnSignin}
       >
        Авторизация
      </button>
    </div>
    </div>
    </div>
  );
}
