import { memo } from 'react';
import appHeaderStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from "react-router-dom";

const Navigator = memo(() => {
  return (
    <nav className={`pl-5 ${appHeaderStyles.nav}`}>
      <ul className={appHeaderStyles.menu}>
        <li>
          <Link to="/react-burger" className={appHeaderStyles.item}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default pl-2 pt-4 pb-4 pr-5">Конструктор</p>
          </Link>
        </li>
        <li>
          <Link to="#" className={appHeaderStyles.item}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive pl-2 pt-4 pb-4 pr-5">Лента заказов</p>
          </Link>
        </li>
      </ul>
    </nav>
  )
})

const Account = memo(() => {
  return (
    <Link className={appHeaderStyles.item} to="/react-burger/profile">
      <ProfileIcon type="secondary" />
      <p className="text text_type_main-default text_color_inactive ml-2 mt-4 mb-4 mr-5">Личный кабинет</p>
    </Link>
  )
})

export function AppHeader() {
  return (
    <div className={appHeaderStyles.container}>
      <header className={`pt-4 pb-4 ${appHeaderStyles.header}`}>
        <Navigator />
        <Logo />
        <Account />
      </header>
    </div>
  )
}
