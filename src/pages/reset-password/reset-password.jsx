import { Button, Input, ShowIcon, HideIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { Link } from 'react-router-dom';
import { useState, useRef } from "react";

export function ResetPasswordPage() {
  const [passwordValue, setPasswordValue] = useState('');
  const [icon, setIcon] = useState('ShowIcon');
  const [type, setType] = useState('password');

  const inputRef = useRef(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    setIcon('HideIcon');
    setType('text');
    if (icon === 'HideIcon' && type === 'text') {
      setIcon('ShowIcon');
      setType('password');
    }
  }

  const [code, setCode] = useState('');

  return (
    <div className={styles.conatiner}>
      <h2 className="mb-6 text text_type_main-medium">Восстановление пароля</h2>
      <form className={styles.form}>
        <Input
          type={type}
          placeholder={'Введите новый пароль'}
          onChange={e => setPasswordValue(e.target.value)}
          value={passwordValue}
          icon={icon}
          name={'email'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка ввода e-mail'}
          size={'default'}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          value={code}
          onChange={e => setCode(e.target.value)}
          name={'code'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка ввода кода'}
          size={'default'}
        />
        <Button type="primary" size="medium" >
          Сохранить
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


