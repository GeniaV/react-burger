import orderStyles from './order.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export function Order({ status }) {
  return (
    <section className={`pt-6 pr-6 pl-6 pb-6 mb-6 ${orderStyles.order_container}`}>
      <div className={orderStyles.technical_info}>
        <p className="text text_type_digits-default">#034535</p>
        <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
      </div>
      <div>
        <h3 className="text text_type_main-medium mb-2">Death Star Starship Main бургер</h3>
        <p className="text text_type_main-default">{status}</p>
      </div>
      <section className={orderStyles.order_info}>
        <ul className={orderStyles.items}>
          <li className={orderStyles.list_item}>
            <Ingredient />
          </li>
          <li className={orderStyles.list_item}>
            <Ingredient />
          </li >
          <li className={orderStyles.list_item}>
            <Ingredient />
          </li >
          <li className={orderStyles.list_item}>
            <Ingredient />
          </li >
          <li className={orderStyles.list_item}>
            <Ingredient />
          </li >
          <li className={orderStyles.list_item}>
            <p className={`text text_type_main-default ${orderStyles.add_qty}`}>+3</p>
            <div className={orderStyles.back}>
              <Ingredient />
            </div>
          </li >
        </ul>
        <div className={`ml-6 ${orderStyles.price_container}`}>
          <p className="text text_type_digits-default mr-2">480</p>
          <CurrencyIcon type="primary" />
        </div>
      </section>
    </section>
  );
}

function Ingredient() {
  return (
    <div className={orderStyles.border}>
      <div className={orderStyles.item}>
      </div>
    </div>
  );
}

Order.propTypes = {
  status: PropTypes.string
}
