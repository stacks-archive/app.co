import React from 'react';
import { useRouter } from 'next/router';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

import { MakerNav as MakerNavDumb } from '@components/maker/nav/maker-nav';
import { selectAppAction } from '@stores/maker/actions';
import { selectAppList } from '@stores/maker/selectors';
import { selectUser } from '@stores/apps/selectors';
import UserStore from '@stores/user';

const handleChangingApp = ({ value }: { value: number }, fn: Function) => (dispatch: Dispatch) => {
  dispatch(selectAppAction(value));
  fn(value);
};

interface MakerNavProps {
  selectedAppId?: number;
}

type MakerNav = React.FC<MakerNavProps>;

export const MakerNav: MakerNav = ({ selectedAppId }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { appList, user } = useSelector(state => ({
    appList: selectAppList(state),
    user: selectUser(state)
  }));

  const updateMakerRoute = (id: number) => router.push(`/maker/apps/${id}`);

  if (!(user && user.jwt)) {
    return null;
  }

  return (
    <MakerNavDumb
      apps={appList}
      selectedAppId={selectedAppId}
      userId={user && user.user && user.user.blockstackUsername}
      handleSignOut={() => {
        dispatch(UserStore.actions.signOut());
        localStorage.clear();
        window.location.href = '/';
      }}
      onChange={e => handleChangingApp(e, updateMakerRoute)(dispatch)}
    />
  );
};
