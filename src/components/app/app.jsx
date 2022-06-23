import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import appStyles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { Modal } from "../modal/modal";
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';
import { removeIngredienFromModal } from '../../services/actions/ingredient';
import { useSelector, useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Preloader } from '../preloaders/preloader';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { NotFound } from '../../pages/not-found/not-found';
import { ProfilePage } from '../../pages/profile/profile';

export function App() {
  const { isIngredientDetailsOpened } = useSelector(store => store.ingredientData);
  const [isOrderDetailsOpened, setOrderDetailsOpened] = useState(false);
  const { ingredientsRequest } = useSelector(store => store.ingredientsList);

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
      {ingredientsRequest && <Preloader />}
      <AppHeader />
      <Switch>
        <Route exact path="/">
          <main className={appStyles.main}>
            <section className={appStyles.container}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                {!ingredientsRequest && <BurgerConstructor onClick={openOrderDetailsModal} />}
              </DndProvider>
            </section>
          </main>
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/register">
          <RegisterPage />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPasswordPage />
        </Route>
        <Route exact path="/reset-password">
          <ResetPasswordPage />
        </Route>
        <Route path="/profile">
          <ProfilePage />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
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
