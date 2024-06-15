import { User } from 'firebase/auth';
import { useCallback } from 'react';
import { create } from 'zustand';

const useZustandStore = create<Store>()((set) => ({
    alertType:'success',
    message : '',
    isAlertOpen:false,
    setAlertMessage: (message:string) => set((_state) => ({ message })),
    setAlertOpen : (isOpen:boolean) => set((_state) => ({ isAlertOpen : isOpen })),
    setAlertType : (alertType:AlertTypes) => set((_state) => ({ alertType })),
    currentUserData : null,
    setCurrentUserData : (currentUserData : CurrentUserDataType<User>)=>set((_state) => ({ currentUserData }))
}))


const useAlert = () => {
    const setAlertOpen = useZustandStore((state) => state.setAlertOpen);
    const setAlertMessage = useZustandStore((state) => state.setAlertMessage);
    const setAlertType = useZustandStore((state) => state.setAlertType);
    const handleAlertOpen = useCallback((message: string, alertType: AlertTypes) => {
        setAlertOpen(true);
        setAlertMessage(message);
        setAlertType(alertType);
    }, [setAlertOpen, setAlertMessage, setAlertType]);

    return handleAlertOpen;
};

export {useZustandStore,useAlert};