import React from 'react';
import { useRouter } from 'next/router';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

import { MakerNav as MakerNavDumb } from '@components/maker/nav/maker-nav';
import { selectAppAction } from '@stores/maker/actions';
import { selectAppList } from '@stores/maker/selectors';
import { selectUser } from '@stores/apps/selectors';
import UserStore from '@stores/user';

const handleChangingApp = (event: any, fn: any) => (dispatch: Dispatch) => {
  event.persist();
  const id = event.target.value;
  dispatch(selectAppAction(id));
  fn(id);
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
