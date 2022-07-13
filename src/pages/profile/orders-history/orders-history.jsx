import ordersStyles from './orders-history.module.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Order } from '../../../components/order/order';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../../services/actions/types';
import { Preloader } from '../../../components/preloader/preloader';

export function OrdersPage() {
  const location = useLocation();

  const orders = useSelector(store => store.ws.orders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED })
    }
  }, [dispatch]);

  if (!orders) {
    return <Preloader />
  }

  return (
    <section className={ordersStyles.section}>
      {orders.map((order) => {
        return (
          <Link to={{ pathname: `/profile/orders/${order._id}`, state: { background: location } }} className={ordersStyles.link} key={order._id}>
            {order.status === 'done' &&
              <Order
                status='Выполнен'
                orderNumber={order.number}
                orderCreateTime={order.createdAt}
                burgerName={order.name}
                ingredients={order.ingredients}
              />
            }
            {order.status === 'created' &&
              <Order
                status='Создан'
                orderNumber={order.number}
                orderCreateTime={order.createdAt}
                burgerName={order.name}
                ingredients={order.ingredients}
              />
            }
            {order.status === 'pending' &&
              <Order
                status='Готовится'
                orderNumber={order.number}
                orderCreateTime={order.createdAt}
                burgerName={order.name}
                ingredients={order.ingredients}
              />
            }
          </Link>)
      })}
    </section>
  );
}
