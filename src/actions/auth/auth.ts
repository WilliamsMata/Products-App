import tesloApi from '../../config/api/tesloApi';
import type {User} from '../../domain/entities/user';
import type {AuthRegisterArgs} from '../../infrastructure/interfaces/auth.args';
import type {AuthResponse} from '../../infrastructure/interfaces/auth.responses';

const returnUserToken = (data: AuthResponse) => {
  const user: User = {
    id: data.id,
    email: data.email,
    fullName: data.fullName,
    isActive: data.isActive,
    roles: data.roles,
  };

  return {
    user,
    token: data.token,
  };
};

export const authLogin = async (email: string, password: string) => {
  email = email.trim().toLowerCase();

  try {
    const {data} = await tesloApi.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    return returnUserToken(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const authRegister = async ({
  email,
  fullName,
  password,
}: AuthRegisterArgs) => {
  email = email.trim().toLowerCase();

  try {
    const {data} = await tesloApi.post<AuthResponse>('/auth/register', {
      email,
      fullName,
      password,
    });

    return returnUserToken(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const authCheckStatus = async () => {
  try {
    const {data} = await tesloApi.get<AuthResponse>('/auth/check-status');
    return returnUserToken(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};
