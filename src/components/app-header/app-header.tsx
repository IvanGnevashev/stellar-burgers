import { selectAuthUser } from '@/services/selectors/authSelectors';
import { useSelector } from '@/services/store';
import { AppHeaderUI } from '@ui';

export const AppHeader = (): React.JSX.Element => {
  const user = useSelector(selectAuthUser);
  const userName = user?.name;

  return <AppHeaderUI userName={userName} />;
};
