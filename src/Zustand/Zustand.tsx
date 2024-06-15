import { create } from 'zustand'

const useZustandStore = create<Store>()((set) => ({
    alertType:'success',
    message : '',
    isAlertOpen:false,
    setAlertMessage: (message:string) => set((_state) => ({ message })),
    setAlertOpen : (isOpen:boolean) => set((_state) => ({ isAlertOpen : isOpen }))
}))

export {useZustandStore};