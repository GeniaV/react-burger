import orderStyles from './order.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getIngredients } from '../../services/actions/ingredients';
import { formatDate } from '../../utils/utils';

export function Order({ status, orderNumber, orderCreateTime, burgerName, ingredients }) {
  const ingredientsqty = ingredients.length;
  const hideIngredirntQty = ingredientsqty - 6;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <section className={`pt-6 pr-6 pl-6 pb-6 mb-6 ${orderStyles.order_container}`}>
      <div className={orderStyles.technical_info}>
        <p className="text text_type_digits-default">#{orderNumber}</p>
        <p className="text text_type_main-default text_color_inactive">{formatDate(orderCreateTime)}</p>
      </div>
      <div>
        <h3 className="text text_type_main-medium mb-2">{burgerName}</h3>
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
          {ingredientsqty > 6 && (
            <li className={orderStyles.list_item}>
              <p className={`text text_type_main-default ${orderStyles.add_qty}`}>{`+${hideIngredirntQty}`}</p>
              <div className={orderStyles.back}>
                <Ingredient />
              </div>
            </li >
          )}
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
  status: PropTypes.string.isRequired,
  orderNumber: PropTypes.number.isRequired,
  orderCreateTime: PropTypes.string.isRequired,
  burgerName: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
}
