import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import appStyles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { Modal } from "../modal/modal";
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';
import { removeIngredienFromModal } from '../../services/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Preloader } from '../preloaders/preloader';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';

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
    <Router>
      {ingredientsRequest && <Preloader />}
      <AppHeader />
      <Switch>
        <Route exact path="/react-burger">
          <main className={appStyles.main}>
            <section className={appStyles.container}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                {!ingredientsRequest && <BurgerConstructor onClick={openOrderDetailsModal} />}
              </DndProvider>
            </section>
          </main>
        </Route>
        <Route exact path="/react-burger/login">
          <LoginPage />
        </Route>
        <Route exact path="/react-burger/register">
          <RegisterPage />
        </Route>
        <Route exact path="/react-burger/forgot-password">
          <ForgotPasswordPage />
        </Route>
        <Route exact path="/react-burger/reset-password">
          <ResetPasswordPage />
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
    </Router>
  )
}
