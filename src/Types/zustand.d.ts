type AlertTypes = 'error'| 'info'| 'success'| 'warning'
type CurrentUserDataType<UserType> = null | UserType
interface Store {
    isAlertOpen: boolean
    setAlertOpen: (isOpen:boolean) => void
    message: string
    setAlertMessage:(message:string) => void
    alertType : AlertTypes
    setAlertType:(alertType:AlertTypes) => void
    currentUserData:CurrentUserDataType
    setCurrentUserData:(alertType:CurrentUserDataType) => void
  }