import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { Link } from 'react-router-dom';
import { useState, useRef } from "react";
import { passwordReset } from "../../utils/api";

export function ForgotPasswordPage() {
  const [emailValue, setEmailValue] = useState('')
  const inputRef = useRef(null)


  const passWordResetRequest = () => {
    passwordReset(emailValue)
    .then (res => {
      console.log(res)
    })
    .catch(err => {
      console.log('Ошибка сброса пароля', err.message);
    })
  }


  return (
    <div className={styles.conatiner}>
      <h2 className="mb-6 text text_type_main-medium">Восстановление пароля</h2>
      <form className={styles.form}>
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={e => setEmailValue(e.target.value)}
          value={emailValue}
          name={'name'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка ввода e-mail'}
          size={'default'}
        />
        <Button type="primary" size="medium" onClick={() => passWordResetRequest(emailValue)}>
          Восстановить
        </Button>
      </form>
      <div className={`mt-20 ${styles.options}`}>
        <p className="mr-2 text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
        <Link className={`text text_type_main-default text_color_inactive ${styles.link}`} to="/login">
          Войти
        </Link>
      </div>
    </div>
  );
}
