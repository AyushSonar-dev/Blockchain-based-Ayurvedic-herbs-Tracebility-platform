import { create } from 'zustand'

interface UserState {
    user: any;
    setUser: (user: any) => void;
}
const useUser = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set(() => ({ user })),
}))

export default useUser