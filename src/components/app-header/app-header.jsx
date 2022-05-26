import React from 'react';
import appHeaderStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Navigator = React.memo(() => {
  return (
    <nav className={`pl-5 ${appHeaderStyles.nav}`}>
      <ul className={appHeaderStyles.menu}>
        <li>
          <a href='/' className={appHeaderStyles.item}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default pl-2 pt-4 pb-4 pr-5">Конструктор</p>
          </a>
        </li>
        <li>
          <a href='/' className={appHeaderStyles.item}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive pl-2 pt-4 pb-4 pr-5">Лента заказов</p>
          </a>
        </li>
      </ul>
    </nav>
  )
})

const Account = React.memo(() => {
  return (
    <div className={appHeaderStyles.item}>
      <ProfileIcon type="secondary" />
      <p className="text text_type_main-default text_color_inactive pl-2 pt-4 pb-4 pr-5">Личный кабинет</p>
    </div>
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
