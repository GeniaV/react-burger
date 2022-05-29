import React, { useState } from 'react';
import appStyles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { Modal } from "../modal/modal";
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';

export function App() {
  const [isIngredientDetailsOpened, setIngredientDetailsOpened] = useState(false);
  const [isOrderDetailsOpened, setOrderDetailsOpened] = useState(false);

  const closeAllModals = () => {
    setIngredientDetailsOpened(false);
    setOrderDetailsOpened(false);
  };

  const openOrderDetailsModal = () => {
    setOrderDetailsOpened(true);
  }

  const openIngredientDetails = (data) => {
    setIngredientDetailsOpened(data);
  }

  return (
    <>
      <AppHeader />
      <main className={appStyles.main}>
        <section className={appStyles.container}>
          <BurgerIngredients onClick={openIngredientDetails} />
          <BurgerConstructor onClick={openOrderDetailsModal} />
        </section>
      </main>
      {isIngredientDetailsOpened &&
        <Modal
          title="Детали ингредиента"
          onOverlayClick={closeAllModals}
          close={closeAllModals}
          onCloseClick={closeAllModals}
        >
          <IngredientDetails ingredientData={isIngredientDetailsOpened} />
        </Modal>}
      {isOrderDetailsOpened &&
        <Modal
          title=""
          onOverlayClick={closeAllModals}
          close={closeAllModals}
          onCloseClick={closeAllModals}
        >
          <OrderDetails />
        </Modal>}
    </>
  )
}


