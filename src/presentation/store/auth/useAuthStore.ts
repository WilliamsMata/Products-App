import {create} from 'zustand';
import type {User} from '../../../domain/entities/user';
import type {AuthStatus} from '../../../infrastructure/interfaces/auth.status';
import {authLogin} from '../../../actions/auth/auth';

export interface AuthState {
  status: AuthStatus;
  token: string | null;
  user: User | null;

  login: (email: string, password: string) => Promise<boolean>;
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

    // todo: save token in storage

    set({status: 'authenticated', token: resp.token, user: resp.user});
    return true;
  },
}));
