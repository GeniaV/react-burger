import React, { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { Modal } from "../modal/modal";
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';
import { getIngredientsFromServer, putAnOrder } from '../../utils/api';
import { IngredientsContext } from '../../services/appContext';

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

  const [selectedIngredients, setSelectedIngredients] = useState({
    bun: {calories: 420,
      carbohydrates: 53,
      fat: 24,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      name: "Краторная булка N-200i",
      price: 1255,
      proteins: 80,
      type: "bun",
      __v: 0,
      _id: "60d3b41abdacab0026a733c6"},
    ingredients: [{calories: 99,
      carbohydrates: 42,
      fat: 24,
      image: "https://code.s3.yandex.net/react/code/sauce-03.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
      name: "Соус традиционный галактический",
      price: 15,
      proteins: 42,
      type: "sauce",
      __v: 0,
      _id: "60d3b41abdacab0026a733ce"}]
  })

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

  let ingredientsId = React.useMemo(() => {
    return selectedIngredients.ingredients.map(ingredient => ingredient._id)
  }, [selectedIngredients]);

  useEffect(() => {
    if (selectedIngredients.ingredients !== [] && selectedIngredients.bun !== null) {
      const bunId = selectedIngredients.bun._id
      ingredientsId.push(bunId)

      putAnOrder(ingredientsId)
        .then(res => setOrderNumber({ ...orderNumber, dataNumber: res.order.number }))
        .catch(err => {
          console.log('Ошибка размещения заказа', err.message);
        });
    }
  }, [])

  return (
    <>
      <AppHeader />
      {!ingredients.isLoading && !ingredients.hasError && ingredients &&
        <main className={appStyles.main}>
          <section className={appStyles.container}>
            <BurgerIngredients ingredients={ingredients.data} onClick={openIngredientDetails} />
            <IngredientsContext.Provider value={selectedIngredients}>
              <BurgerConstructor onClick={openOrderDetailsModal} />
            </IngredientsContext.Provider>
          </section>
        </main>}
      {isIngredientDetailsOpened &&
        <Modal
          title="Детали ингредиента"
          onOverlayClick={closeAllModals}
          close={closeAllModals}
          onCloseClick={closeAllModals}
        >
          <IngredientDetails ingredientData={isIngredientDetailsOpened} />
        </Modal>}
      {isOrderDetailsOpened && selectedIngredients.ingredients !== [] && selectedIngredients.bun !== null &&
        <Modal
          title=""
          onOverlayClick={closeAllModals}
          close={closeAllModals}
          onCloseClick={closeAllModals}
        >
          <OrderDetails orderNumber={orderNumber.dataNumber}/>
        </Modal>}
    </>
  )
}







