import feedStyles from './feed.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Order } from '../../components/order/order';

export function FeedPage() {
  return (
    <section className={feedStyles.page}>
      <article className={`pl-2 pr-2 ${feedStyles.feed_section}`}>
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
        <div className={`mt-5 ${feedStyles.section}`}>
          <Orders/>
        </div>
      </article>
      <OrdersStatusSection />
    </section>
  );
}

export function Orders() {
  const location = useLocation();
  const { id } = 'rr';

  return (
    <Link to={{ pathname: `/feed/${id}`, state: { background: location } }} className={feedStyles.link}>
      <Order status='' />
      <Order status='' />
      <Order status='' />
      <Order status='' />
    </Link>
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


