import {
  selectAuthUser,
  selectUpdateUserError,
  selectUpdateUserLoading,
} from '@/services/selectors/authSelectors';
import { updateUser } from '@/services/slices/authSlice';
import { useDispatch, useSelector } from '@/services/store';
import { ProfileUI } from '@ui-pages';
import { type SyntheticEvent, useEffect, useState } from 'react';

import type { TRegisterData } from '@/utils/burger-api';

export const Profile = (): React.JSX.Element => {
  const user = useSelector(selectAuthUser);
  const dispatch = useDispatch();
  const isUpdating = useSelector(selectUpdateUserLoading);
  const updateError = useSelector(selectUpdateUserError);

  const [formValue, setFormValue] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: '',
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name ?? '',
      email: user?.email ?? '',
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== (user?.name ?? '') ||
    formValue.email !== (user?.email ?? '') ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    if (!user || !isFormChanged || isUpdating) return;

    const changes: Partial<TRegisterData> = {};

    if (formValue.name !== user.name) changes.name = formValue.name;
    if (formValue.email !== user.email) changes.email = formValue.email;
    if (formValue.password !== '') changes.password = formValue.password;

    void dispatch(updateUser(changes))
      .unwrap()
      .then(() => {
        setFormValue((current) => ({ ...current, password: '' }));
      })
      .catch(() => undefined);
  };

  const handleCancel = (e: SyntheticEvent): void => {
    e.preventDefault();
    setFormValue({
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={updateError?.message ?? ''}
    />
  );
};
