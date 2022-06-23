import { memo, useEffect, useState } from 'react';
import appHeaderStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink, useRouteMatch } from "react-router-dom";

const Navigator = memo(() => {
  const { isExact } = useRouteMatch("/");
  const [iconColor, setIconColor] = useState(null);

  useEffect(()=> {
    if(isExact  === true) {
      setIconColor('primary');
    } else {
      setIconColor('secondary');
    }
  }, [isExact])

  return (
    <nav className={`pl-5 ${appHeaderStyles.nav}`}>
      <ul className={appHeaderStyles.menu}>
        <li>
          <NavLink exact to="/" className={appHeaderStyles.item} activeClassName={appHeaderStyles.activeLink}>
            <BurgerIcon type={iconColor} />
            <p className="text text_type_main-default pl-2 pt-4 pb-4 pr-5">Конструктор</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="#" className={appHeaderStyles.item}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive pl-2 pt-4 pb-4 pr-5">Лента заказов</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
})

const Account = memo(() => {
  return (
    <NavLink className={appHeaderStyles.item} activeClassName={appHeaderStyles.activeLink} to="/profile">
      <ProfileIcon type="secondary" />
      <p className="text text_type_main-default text_color_inactive ml-2 mt-4 mb-4 mr-5">Личный кабинет</p>
    </NavLink>
  )
})

export const AppHeader = memo(() => {
  return (
    <div className={appHeaderStyles.container}>
      <header className={`pt-4 pb-4 ${appHeaderStyles.header}`}>
        <Navigator />
        <Logo />
        <Account />
      </header>
    </div>
  )
})
