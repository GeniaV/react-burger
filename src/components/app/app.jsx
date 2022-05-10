import React, { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { Modal } from "../modal/modal";
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';
import { getIngredientsFromServer } from '../../utils/api';

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

  const handleEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      closeAllModals()
    }
  }

  const openOrderDetailsModal = () => {
    setOrderDetailsOpened(true);
  }

  const openIngredientDetails = (data) => {
    setIngredientDetailsOpened(data);
  }

  useEffect(() => {
    getIngredients();
  }, [])

  const getIngredients = () => {
    setIngredients({ ...ingredients, hasError: false, isLoading: true });
    getIngredientsFromServer()
      .then(res => setIngredients({ ...ingredients, data: res.data, isLoading: false }))
      .catch(err => {
        setIngredients({ ...ingredients, isLoading: false, hasError: true, errorMessage: err.message })
      });
  };

 const ingredientsArray = ingredients.data

  return (
    <>
      <AppHeader />
      {!ingredients.isLoading && !ingredients.hasError && ingredients &&
        <main className={appStyles.main}>
          <section className={appStyles.container}>
            <BurgerIngredients ingredients={ingredientsArray} onClick={openIngredientDetails}/>
            <BurgerConstructor ingredients={ingredientsArray} onClick={openOrderDetailsModal} />
          </section>
        </main>}
      {isIngredientDetailsOpened &&
        <Modal
          title="Детали ингредиента"
          onOverlayClick={closeAllModals}
          onEscKeydown={handleEscKeydown}
          onCloseClick={closeAllModals}
        >
          <IngredientDetails ingredientdata={isIngredientDetailsOpened}/>
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







