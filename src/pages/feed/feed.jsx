import feedStyles from './feed.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export function FeedPage() {
  return (
    <section className={feedStyles.page}>
      <article className={`pl-2 pr-2 ${feedStyles.feed_section}`}>
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
        <div className={`mt-5 ${feedStyles.section}`}>
          <OrderInfo />
          <OrderInfo />
          <OrderInfo />
          <OrderInfo />
          <OrderInfo />
          <OrderInfo />
        </div>
      </article>
      <OrdersStatusSection />
    </section>
  );
}

function OrderInfo() {
  return (
    <section className={`pt-6 pr-6 pl-6 mb-4 ${feedStyles.order_container}`}>
      <div className={feedStyles.technical_info}>
        <p className="text text_type_digits-default">#034535</p>
        <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
      </div>
      <h3 className="text text_type_main-medium">Death Star Starship Main бургер</h3>
      <section className={feedStyles.order_info}>
        <ul className={feedStyles.items}>
          <li className={feedStyles.list_item}>
            <Ingredient />
          </li>
          <li className={feedStyles.list_item}>
            <Ingredient />
          </li >
          <li className={feedStyles.list_item}>
            <Ingredient />
          </li >
          <li className={feedStyles.list_item}>
            <Ingredient />
          </li >
          <li className={feedStyles.list_item}>
            <Ingredient />
          </li >
          <li className={feedStyles.list_item}>
            <p className={`text text_type_main-default ${feedStyles.add_qty}`}>+3</p>
            <div className={feedStyles.back}>
              <Ingredient />
            </div>
          </li >
        </ul>
        <div className={`ml-6 ${feedStyles.price_container}`}>
          <p className="text text_type_digits-default mr-2">480</p>
          <CurrencyIcon type="primary" />
        </div>
      </section>
    </section>
  );
}

function Ingredient() {
  return (
    <div className={feedStyles.border}>
      <div className={feedStyles.item}>
      </div>
    </div>

  );
}

function OrdersStatusSection() {
  return (
    <section className={feedStyles.status_container}>
      <article className={feedStyles.board}>
        <div className={feedStyles.status_lists}>
          <h3 className="text text_type_main-medium pb-6">Готовы:</h3>
          <ul className={feedStyles.done_list}>
            <li className="text text_type_digits-default">034533</li>
            <li className="text text_type_digits-default">034532</li>
            <li className="text text_type_digits-default">034530</li>
            <li className="text text_type_digits-default">034527</li>
            <li className="text text_type_digits-default">034525</li>
          </ul>
        </div>
        <div className={feedStyles.status_lists}>
          <h3 className="text text_type_main-medium pb-6">В работе:</h3>
          <ul className={feedStyles.inprocess_list}>
            <li className="text text_type_digits-default">034538</li>
            <li className="text text_type_digits-default">034541</li>
            <li className="text text_type_digits-default">034542</li>
          </ul>
        </div>
      </article>
      <div>
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <p className={`text text_type_digits-large ${feedStyles.done_qty}`}>28 752</p>
      </div>
      <div>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <p className={`text text_type_digits-large ${feedStyles.done_qty}`}>138</p>
      </div>
    </section>
  )
}



