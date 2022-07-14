import orderInfoStyles from './order-info.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { formatDate } from '../../utils/utils';
import { useMemo, useEffect } from 'react';
import { Preloader } from '../preloader/preloader';
import { useHistory } from 'react-router-dom';
import PropTypes from "prop-types";

export function OrderInformation() {
  let { id } = useParams();
  const orders = useSelector(store => store.ws.orders);
  let orderData = orders.find((el) => el._id === id);

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (!orderData) {
      history.replace(`/feed/${id}`);
    }
  }, [dispatch, orderData, history, id]);

  let count = {};

  for (let elem of orderData.ingredients) {
    if (count[elem] === undefined) {
      count[elem] = 1;
    } else {
      count[elem]++;
    }
  }

  orderData.count = count;

  const allIngredients = useSelector(store => store.ingredientsList.ingredients);

  const totalOrder = orderData.ingredients.reduce((previousValue, currentItem) => {

    const ingredient = allIngredients.find((item) => {
      return currentItem === item._id;
    });

    if (!ingredient) {
      return previousValue;
    }

    return previousValue + ingredient.price;

  }, 0);

  if (!orderData) {
    return (<Preloader />)
  }

  return (
    <>
      <p className={`text text_type_digits-default mb-10 ${orderInfoStyles.order_number}`}>#{orderData.number}</p>
      <h3 className="text text_type_main-medium mb-3">{orderData.name}</h3>
      {orderData.status === 'done' &&
        <p className={`text text_type_main-default mb-15 ${orderInfoStyles.done}`}>Выполнен</p>
      }
      {orderData.status === 'created' &&
        <p className="text text_type_main-default mb-15">Создан</p>
      }
      {orderData.status === 'pending' &&
        <p className="text text_type_main-default mb-15">Готовится</p>
      }
      <h3 className="text text_type_main-medium mb-6">Состав:</h3>
      <section className={orderInfoStyles.ingredients_section}>
        {orderData.count && [...new Set(orderData.ingredients)].map((ingredient, index) =>
          <IngredientInfo ingredient={ingredient} key={index} count={orderData.count} />
        )}
      </section>
      <div className={`mt-10 ${orderInfoStyles.technical_info}`}>
        <p className="text text_type_main-default text_color_inactive">{formatDate(orderData.createdAt)}</p>
        <div className={`ml-6 ${orderInfoStyles.price_container}`}>
          <p className="text text_type_digits-default mr-2">{totalOrder}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </>
  );
}

function IngredientInfo({ ingredient, count }) {

  const allIngredients = useSelector(store => store.ingredientsList.ingredients);

  const currentIngredient = useMemo(() => {
    return allIngredients.find((item) => ingredient === item._id)
  }, [ingredient, allIngredients]);

  if (!ingredient) {
    return null
  }

  return (
    <section className={orderInfoStyles.ingredient_info}>
      <div className={orderInfoStyles.info}>
        <div className={orderInfoStyles.border}>
          <div className={orderInfoStyles.item}>
            <img className={orderInfoStyles.img} src={currentIngredient.image} alt={currentIngredient.name} />
          </div>
        </div>
        <p className={`text text_type_main-default ml-4 mr-4 ${orderInfoStyles.text}`}>
          {currentIngredient.name}
        </p>
      </div>
      <div className={orderInfoStyles.qty_container}>
        <p className="text text_type_digits-default mr-2">{`${count[currentIngredient._id]} x ${currentIngredient.price}`}</p>
        <CurrencyIcon type="primary" />
      </div>
    </section>
  )
}

IngredientInfo.propTypes = {
  ingredient: PropTypes.string.isRequired,
  count: PropTypes.object.isRequired
}



