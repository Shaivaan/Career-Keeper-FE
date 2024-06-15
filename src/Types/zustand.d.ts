interface Store {
    isAlertOpen: boolean
    setAlertOpen: (isOpen:boolean) => void
    message: string
    setAlertMessage:(message:string) => void
    alertType : 'error'| 'info'| 'success'| 'warning'
  }