import { FollowersType } from './Followers.types';
import { UserType } from './User.types';

export type AppType = {
  signed: boolean;
  user: UserType | null;
  currentLocation: object | null;
  setCurrentLocation: (location: object) => void;
  rol: boolean | null;
  signIn(usr: UserType): Promise<void>;
  signOut(): Promise<void>;
  isLoadingApp: boolean;
  isAuthenticated: boolean;
  isDataReady: boolean;
  isOffline: boolean;
  checkUserAuth: () => Promise<void>;
};
