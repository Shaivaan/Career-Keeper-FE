type AlertTypes = 'error'| 'info'| 'success'| 'warning'
type CurrentUserDataType<UserType = AppUser> = null | UserType

/**
 * App-level user shape. Mirrors the minimal fields the UI needs.
 * `uid` is kept (instead of Supabase's `id`) so existing components that
 * read `currentUserData.uid` continue to work unchanged.
 */
interface AppUser {
  uid: string;
  email: string | null;
}

interface Store {
    isAlertOpen: boolean
    setAlertOpen: (isOpen:boolean) => void
    message: string
    setAlertMessage:(message:string) => void
    alertType : AlertTypes
    setAlertType:(alertType:AlertTypes) => void
    currentUserData:CurrentUserDataType
    setCurrentUserData:(currentUserData:CurrentUserDataType) => void
    isApiProcessing:boolean
    setIsApiProcessing :(isApiProcessing:boolean) => void
  }
