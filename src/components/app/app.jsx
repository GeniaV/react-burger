import React, { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { Modal } from "../modal/modal";
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';
import { getIngredientsFromServer, putAnOrder } from '../../utils/api';
import { IngredirntsContext } from '../../services/ingredientsContext';

export function App() {
  const [ingredients, setIngredients] = useState({
    isLoading: false,
    hasError: false,
    errorMessage: '',
    data: []
  });

  const [isIngredientDetailsOpened, setIngredientDetailsOpened] = useState(false);
  const [isOrderDetailsOpened, setOrderDetailsOpened] = useState(false);

  const [orderNumber, setOrderNumber] = useState(null);

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

  useEffect(() => {
    putAnOrder()
      .then(res => setOrderNumber({ ...orderNumber, dataNumber: res.order.number }))
      .catch(err => {
        console.log('Ошибка размещения заказа', err.message);
      });
  }, [])

  return (
    <>
      <AppHeader />
      {!ingredients.isLoading && !ingredients.hasError && ingredients &&
        <main className={appStyles.main}>
          <section className={appStyles.container}>
            <BurgerIngredients ingredients={ingredientsArray} onClick={openIngredientDetails} />
            <IngredirntsContext.Provider value={ingredientsArray}>
              <BurgerConstructor onClick={openOrderDetailsModal} />
            </IngredirntsContext.Provider>
          </section>
        </main>}
      {isIngredientDetailsOpened &&
        <Modal
          title="Детали ингредиента"
          onOverlayClick={closeAllModals}
          onEscKeydown={handleEscKeydown}
          onCloseClick={closeAllModals}
        >
          <IngredientDetails ingredientData={isIngredientDetailsOpened} />
        </Modal>}
      {isOrderDetailsOpened &&
        <Modal
          title=""
          onOverlayClick={closeAllModals}
          onEscKeydown={handleEscKeydown}
          onCloseClick={closeAllModals}
        >
          <OrderDetails orderNumber={orderNumber.dataNumber}/>
        </Modal>}
    </>
  )

}







