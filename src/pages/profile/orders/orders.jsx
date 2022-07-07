import ordersStyles from './orders.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export function OrdersPage() {

  return (
    <section className={ordersStyles.section}>
      <OrderInfo />
      <OrderInfo />
      <OrderInfo />
      <OrderInfo />
      <OrderInfo />
      <OrderInfo />
      <OrderInfo />
      <OrderInfo />
    </section>

  );
}

function OrderInfo() {
  const location = useLocation();
  const { id } = 'kl';

  return (
    <Link to={{ pathname: `/profile/orders/${id}`, state: { background: location } }} className={ordersStyles.link}>
    <section className={`pt-6 pr-6 pl-6 pb-6 mb-6 ${ordersStyles.order_container}`}>
      <div className={ordersStyles.technical_info}>
        <p className="text text_type_digits-default">#034535</p>
        <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
      </div>
      <div>
        <h3 className="text text_type_main-medium mb-2">Death Star Starship Main бургер</h3>
        <p className="text text_type_main-default">Cоздан</p>
      </div>
      <section className={ordersStyles.order_info}>
        <ul className={ordersStyles.items}>
          <li className={ordersStyles.list_item}>
            <Ingredient />
          </li>
          <li className={ordersStyles.list_item}>
            <Ingredient />
          </li >
          <li className={ordersStyles.list_item}>
            <Ingredient />
          </li >
          <li className={ordersStyles.list_item}>
            <Ingredient />
          </li >
          <li className={ordersStyles.list_item}>
            <Ingredient />
          </li >
          <li className={ordersStyles.list_item}>
            <p className={`text text_type_main-default ${ordersStyles.add_qty}`}>+3</p>
            <div className={ordersStyles.back}>
              <Ingredient />
            </div>
          </li >
        </ul>
        <div className={`ml-6 ${ordersStyles.price_container}`}>
          <p className="text text_type_digits-default mr-2">480</p>
          <CurrencyIcon type="primary" />
        </div>
      </section>
    </section>
    </Link>
  );
}

function Ingredient() {
  return (
    <div className={ordersStyles.border}>
      <div className={ordersStyles.item}>
      </div>
    </div>
  );
}
