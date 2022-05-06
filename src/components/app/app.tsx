import React, { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { Modal } from "../modal/modal";
import { data } from '../../utils/data';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';

const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';

export function App() {
  const [ingredients, setIngredients] = useState({
    isLoading: false,
    hasError: false,
    errorMessage: '',
    data: []
  });

  const [isIngredientDetailsOpened, setIngredientDetailsOpened] = useState(false);
  const [isOrderDetailsOpened, setOrderDetailsOpened] = useState(false);

  const closeAllModals = () => {
    setIngredientDetailsOpened(false);
    setOrderDetailsOpened(false);
  };

  const handleEscKeydown = (evt: { key: string; }) => {
    if (evt.key === 'Escape') {
      closeAllModals()
    }
  }

  const openOrderDetailsModal = () => {
    setOrderDetailsOpened(true);
  }

  const openIngredientDetails = () => {
    setIngredientDetailsOpened(true);
  }

  useEffect(() => {
    getIngredients();
  }, [])

  const getIngredients = () => {
    setIngredients({ ...ingredients, hasError: false, isLoading: true });
    fetch(apiUrl)
      .then(res => res.json())
      .then(res => setIngredients({ ...ingredients, data: res.data, isLoading: false }))
      .catch(err => {
        setIngredients({ ...ingredients, isLoading: false, hasError: true, errorMessage: err.message })
        console.log(`Произошла ошибка: ${err.message}`)
      });
  };

  return (
    <>
      <AppHeader />
      {!ingredients.isLoading && !ingredients.hasError && ingredients &&
        <main className={appStyles.main}>
          <section className={appStyles.container}>
            <BurgerIngredients ingredients={ingredients.data} onClick={openIngredientDetails}/>
            <BurgerConstructor ingredients={data} onClick={openOrderDetailsModal} />
          </section>
        </main>}
      {isIngredientDetailsOpened &&
        <Modal
          title="Детали ингредиента"
          onOverlayClick={closeAllModals}
          onEscKeydown={handleEscKeydown}
          onCloseClick={closeAllModals}
        >
          <IngredientDetails />
        </Modal>}
      {isOrderDetailsOpened &&
        <Modal
          title=""
          onOverlayClick={closeAllModals}
          onEscKeydown={handleEscKeydown}
          onCloseClick={closeAllModals}
        >
          <OrderDetails />
        </Modal>}
    </>
  )

}







