import { selectAuthUser, selectIsAuthChecked } from '@/services/selectors/authSelectors';
import { selectConstructor } from '@/services/selectors/burgerSelectors';
import {
  selectCreatedOrder,
  selectCreateOrderLoading,
} from '@/services/selectors/createOrderSelectors';
import { clearConstructor } from '@/services/slices/burgerSlice';
import { clearCreateOrder, fetchCreateOrder } from '@/services/slices/createOrderSlice';
import { useDispatch, useSelector } from '@/services/store';
import { BurgerConstructorUI } from '@ui';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import type { TConstructorIngredient, TConstructorState } from '@utils-types';

export const BurgerConstructor = (): React.JSX.Element | null => {
  /** TODO: Взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems: TConstructorState = useSelector(selectConstructor);
  const orderRequest = useSelector(selectCreateOrderLoading);
  const orderModalData = useSelector(selectCreatedOrder);
  const isAuthChecked = useSelector(selectIsAuthChecked);

  const user = useSelector(selectAuthUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onOrderClick = (): void => {
    if (!isAuthChecked || !constructorItems.bun || orderRequest) return;
    if (!user) {
      void navigate('/login', { state: { from: location } });
      return;
    }
    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id,
    ];
    void dispatch(fetchCreateOrder(ingredientIds)).then((action) => {
      if (fetchCreateOrder.fulfilled.match(action)) {
        dispatch(clearConstructor());
      }
    });
  };

  const closeOrderModal = (): void => {
    dispatch(clearCreateOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
