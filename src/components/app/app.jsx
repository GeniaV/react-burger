import React, { useState } from 'react';
import appStyles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { Modal } from "../modal/modal";
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';
import { removeIngredienFromModal } from '../../services/actions/actions';
import { useSelector, useDispatch } from 'react-redux';

export function App() {
  const { isIngredientDetailsOpened } = useSelector(store => store.ingredientData);
  const [isOrderDetailsOpened, setOrderDetailsOpened] = useState(false);

  const dispatch = useDispatch();

  const closeAllModals = () => {
    dispatch(removeIngredienFromModal())
    setOrderDetailsOpened(false);
  };

  const openOrderDetailsModal = () => {
    setOrderDetailsOpened(true);
  }

  return (
    <>
      <AppHeader />
      <main className={appStyles.main}>
        <section className={appStyles.container}>
          <BurgerIngredients />
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
          <IngredientDetails />
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


