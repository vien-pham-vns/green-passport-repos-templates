import { User } from 'types/user';
import { create } from 'zustand';

interface UserStore {
  user: User | null;
  setUser: (data: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (data) => {
    set({ user: data });
    sessionStorage.setItem('userId', data.id);
  },
}));

export default useUserStore;
