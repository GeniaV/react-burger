import styles from "./profile.module.css"
import { Input, EditIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { OrdersPage } from "./orders/orders";

export function ProfilePage() {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [disabledName, setDisabledName] = useState(true);
  const [disabledLogin, setDisabledLogin] = useState(true);
  const [disabledPassword, setDisabledPassword] = useState(true);

  const inutRefName = useRef(null);
  const inutRefLogin = useRef(null);
  const inutRefPassword = useRef(null);

  const inputNameOnEditIconClick = () => {
    setTimeout(() => inutRefName.current.focus(), 0);
    setDisabledName(false);
  }

  const inputNameOnBlur = () => {
    setDisabledName(true);
  }

  const inputLoginOnEditIconClick = () => {
    setTimeout(() => inutRefLogin.current.focus(), 0);
    setDisabledLogin(false);
  }

  const inputLoginOnBlur = () => {
    setDisabledLogin(true);
  }

  const inputPasswordOnEditIconClick = () => {
    setTimeout(() => inutRefPassword.current.focus(), 0);
    setDisabledPassword(false);
  }

  const inputPasswordOnBlur = () => {
    setDisabledPassword(true);
  }

  return (
    <div className={styles.wrapper}>
      <nav>
        <ul className={`mb-20 ${styles.list}`}>
          <NavLink exact to="/profile" className={`text text_type_main-medium ${styles.link}`} activeClassName={styles.activeLink}>
            Профиль
          </NavLink>
          <NavLink exact to="/profile/orders" className={`text text_type_main-medium ${styles.link}`} activeClassName={styles.activeLink}>
            История заказов
          </NavLink>
          <Link to="/" className={`text text_type_main-medium ${styles.link}`} >
            Выход
          </Link>
        </ul>
        <p className={`text text_type_main-default text_color_inactive ${styles.additional_text}`}>
          В этом разделе вы можете изменить&nbsp;свои персональные данные
        </p>
      </nav>
      <Switch>
        <Route exact path="/profile/orders">
          <OrdersPage />
        </Route>
        <Route exact path="/profile">
          <form className={styles.form}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={e => setName(e.target.value)}
              value={name}
              icon={'EditIcon'}
              name={'name'}
              error={false}
              ref={inutRefName}
              onIconClick={inputNameOnEditIconClick}
              errorText={'Ошибка ввода имени'}
              size={'default'}
              disabled={disabledName}
              onBlur={inputNameOnBlur}
            />
            <Input
              type={'email'}
              placeholder={'Логин'}
              onChange={e => setLogin(e.target.value)}
              value={login}
              icon={'EditIcon'}
              name={'login'}
              error={false}
              ref={inutRefLogin}
              onIconClick={inputLoginOnEditIconClick}
              errorText={'Ошибка ввода логина'}
              size={'default'}
              disabled={disabledLogin}
              onBlur={inputLoginOnBlur}
            />
            <Input
              type={'password'}
              placeholder={'Пароль'}
              onChange={e => setPassword(e.target.value)}
              value={password}
              icon={'EditIcon'}
              name={'password'}
              error={false}
              ref={inutRefPassword}
              onIconClick={inputPasswordOnEditIconClick}
              errorText={'Ошибка ввода пароля'}
              size={'default'}
              disabled={disabledPassword}
              onBlur={inputPasswordOnBlur}
            />
          </form>
        </Route>
      </Switch>
    </div>
  );
}
