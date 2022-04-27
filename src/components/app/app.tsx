import React from 'react';
import appStyles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';

export class App extends React.Component {
  render() {
    return (
      <>
        <AppHeader />
        <main className={appStyles.main}>
          <section className={appStyles.container}>
            <BurgerIngredients />
            <BurgerConstructor />
          </section>
        </main>
      </>
    )
  }
} 