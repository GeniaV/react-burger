import orderInfoStyles from './order-info.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export function OrderInformation() {
  return (
    <section className={orderInfoStyles.container}>
      <p className={`text text_type_digits-default mb-10 ${orderInfoStyles.order_number}`}>#034533</p>
      <h3 className="text text_type_main-medium mb-3">Black Hole Singularity острый бургер</h3>
      <p className="text text_type_main-default mb-15">Выполнен</p>
      <h3 className="text text_type_main-medium mb-6">Состав:</h3>
      <section className={orderInfoStyles.ingredients_section}>
        <IngredientInfo />
        <IngredientInfo />
        <IngredientInfo />
        <IngredientInfo />
        <IngredientInfo />
        <IngredientInfo />
      </section>
      <div className={`mt-10 ${orderInfoStyles.technical_info}`}>
        <p className="text text_type_main-default text_color_inactive">Вчера, 13:50 i-GMT+3</p>
        <div className={`ml-6 ${orderInfoStyles.price_container}`}>
          <p className="text text_type_digits-default mr-2">510</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
}

function IngredientInfo() {
  return (
    <section className={orderInfoStyles.ingredient_info}>
      <div className={orderInfoStyles.info}>
        <div className={orderInfoStyles.border}>
          <div className={orderInfoStyles.item}>
          </div>
        </div>
        <p className={`text text_type_main-default ml-4 mr-4 ${orderInfoStyles.text}`}>
          Соус традиционный галактический
        </p>
      </div>
      <div className={orderInfoStyles.qty_container}>
        <p className="text text_type_digits-default mr-2">1 x 300</p>
        <CurrencyIcon type="primary" />
      </div>
    </section>
  )
}
