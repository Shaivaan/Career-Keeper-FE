type AlertTypes = 'error'| 'info'| 'success'| 'warning'
interface Store {
    isAlertOpen: boolean
    setAlertOpen: (isOpen:boolean) => void
    message: string
    setAlertMessage:(message:string) => void
    alertType : AlertTypes
    setAlertType:(alertType:AlertTypes) => void
  }