import { selectFeedsOrders } from '@/services/selectors/feedsSelectors';
import { fetchFeeds } from '@/services/slices/feedsSlice';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useEffect } from 'react';

import { useDispatch, useSelector } from '@services/store';

export const Feed = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedsOrders);

  useEffect(() => {
    void dispatch(fetchFeeds());

    const intervalId = window.setInterval(() => {
      void dispatch(fetchFeeds());
    }, 5000);

    return (): void => window.clearInterval(intervalId);
  }, [dispatch]);

  const handleGetFeeds = (): void => {
    void dispatch(fetchFeeds());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
