import orderInfoStyles from './order-info.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { formatDate } from '../../utils/utils';
import { useMemo, useEffect } from 'react';
import { Preloader } from '../preloader/preloader';
import { useHistory } from 'react-router-dom';
import { getIngredients } from '../../services/actions/ingredients';

export function OrderInformation() {
  let { id } = useParams();
  const orders = useSelector(store => store.ws.orders);
  let ingredientData = orders.find((el) => el._id === id);

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (!ingredientData) {
      dispatch(getIngredients());
      history.replace(`/feed/${id}`);
    }
  }, [dispatch]);

  let count = {};

  for (let elem of ingredientData.ingredients) {
    if (count[elem] === undefined) {
      count[elem] = 1;
    } else {
      count[elem]++;
    }
  }

  ingredientData.count = count;

  if (!ingredientData) {
    return (<Preloader />)
  }

  return (
    <>
      <p className={`text text_type_digits-default mb-10 ${orderInfoStyles.order_number}`}>#{ingredientData.number}</p>
      <h3 className="text text_type_main-medium mb-3">{ingredientData.name}</h3>
      {ingredientData.status === 'done' &&
        <p className={`text text_type_main-default mb-15 ${orderInfoStyles.done}`}>Выполнен</p>
      }
      {ingredientData.status === 'created' &&
        <p className="text text_type_main-default mb-15">Создан</p>
      }
      {ingredientData.status === 'pending' &&
        <p className="text text_type_main-default mb-15">Готовится</p>
      }
      <h3 className="text text_type_main-medium mb-6">Состав:</h3>
      <section className={orderInfoStyles.ingredients_section}>
        {ingredientData.count && [... new Set(ingredientData.ingredients)].map((ingredient, index) =>
          <IngredientInfo ingredient={ingredient} key={index} count={ingredientData.count} />
        )}
      </section>
      <div className={`mt-10 ${orderInfoStyles.technical_info}`}>
        <p className="text text_type_main-default text_color_inactive">{formatDate(ingredientData.createdAt)}</p>
        <div className={`ml-6 ${orderInfoStyles.price_container}`}>
          <p className="text text_type_digits-default mr-2">510</p>
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
  }
    , [ingredient, allIngredients]);

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


