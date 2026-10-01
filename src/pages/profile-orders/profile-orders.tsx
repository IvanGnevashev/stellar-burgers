import { selectProfileOrders } from '@/services/selectors/profileOrdersSelectors';
import { fetchProfileOrders } from '@/services/slices/profileOrdersSlice';
import { useDispatch, useSelector } from '@/services/store';
import { ProfileOrdersUI } from '@ui-pages';
import { useEffect } from 'react';

export const ProfileOrders = (): React.JSX.Element => {
  const orders = useSelector(selectProfileOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    void dispatch(fetchProfileOrders());

    const intervalId = window.setInterval(() => {
      void dispatch(fetchProfileOrders());
    }, 5000);

    return (): void => window.clearInterval(intervalId);
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
