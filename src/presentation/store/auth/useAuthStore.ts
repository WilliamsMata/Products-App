import {create} from 'zustand';
import type {User} from '../../../domain/entities/user';
import type {AuthStatus} from '../../../infrastructure/interfaces/auth.status';
import {authCheckStatus, authLogin} from '../../../actions/auth/auth';
import {StorageAdapter} from '../../../config/adapters/storage-adapter';

export interface AuthState {
  status: AuthStatus;
  token: string | null;
  user: User | null;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>(set => ({
  status: 'checking',
  token: null,
  user: null,

  login: async (email, password) => {
    const resp = await authLogin(email, password);

    if (!resp) {
      set({status: 'unauthenticated', token: null, user: null});
      return false;
    }

    await StorageAdapter.setItem('token', resp.token);

    set({status: 'authenticated', token: resp.token, user: resp.user});

    return true;
  },

  checkStatus: async () => {
    const resp = await authCheckStatus();

    if (!resp) {
      set({status: 'unauthenticated', token: null, user: null});
      return false;
    }

    await StorageAdapter.setItem('token', resp.token);

    set({status: 'authenticated', token: resp.token, user: resp.user});

    return true;
  },
}));
