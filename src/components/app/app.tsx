import React, { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { data } from '../../utils/data';

const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';

export function App() {
    return (
    <>
      <AppHeader />
      <main className={appStyles.main}>
        <section className={appStyles.container}>
          <BurgerIngredients ingredients={data} />
          <BurgerConstructor ingredients={data} />
        </section>
      </main>
      <ModalOverlay />
    </>
  )
}





