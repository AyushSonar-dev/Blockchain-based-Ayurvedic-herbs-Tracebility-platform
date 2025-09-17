import { create } from 'zustand'

const useUser = create((set) => ({
    user: null,
    setUser: () => set((state: any, user: any) => ({ user: user }))
}))

export default useUser