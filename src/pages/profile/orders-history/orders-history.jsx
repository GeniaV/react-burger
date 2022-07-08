import ordersStyles from './orders-history.module.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Order } from '../../../components/order/order';

export function OrdersPage() {
  const location = useLocation();
  const { id } = 'kl';

  return (
    <section className={ordersStyles.section}>
      <Link to={{ pathname: `/profile/orders/${id}`, state: { background: location } }} className={ordersStyles.link}>
        <Order status='Cоздан' />
        <Order status='Выполнен' />
      </Link>
    </section>
  );
}
