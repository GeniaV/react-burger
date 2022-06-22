import styles from "./profile.module.css"
import { Input, EditIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { OrdersPage } from "./orders/orders";

export function ProfilePage() {
  const [name, setName] = useState('');
  const inutRefName = useRef(null);

  const [disabled, setDisabled] = useState(true);

  const onIconClick = () => {
    setTimeout((inputRef) => inputRef.current.focus(), 0)
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
              name={'name'}
              icon={'EditIcon'}
              error={false}
              onIconClick={(inutRefName) => onIconClick(inutRefName)}
              ref={inutRefName}
              errorText={'Ошибка ввода имени'}
              size={'default'}
              disabled={disabled}
            />
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={e => setName(e.target.value)}
              value={name}
              name={'name'}
              icon={'EditIcon'}
              error={false}
              onIconClick={(inutRefName) => onIconClick(inutRefName)}
              ref={inutRefName}
              errorText={'Ошибка ввода имени'}
              size={'default'}
              disabled={disabled}
            />
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={e => setName(e.target.value)}
              value={name}
              name={'name'}
              icon={'EditIcon'}
              error={false}
              onIconClick={(inutRefName) => onIconClick(inutRefName)}
              ref={inutRefName}
              errorText={'Ошибка ввода имени'}
              size={'default'}
              disabled={disabled}
            />
          </form>
        </Route>
      </Switch>
    </div>
  );
}
