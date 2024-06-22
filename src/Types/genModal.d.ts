interface GeneralModalParentType{
    isOpen:boolean,
    handleClose : ()=>void
    children:ReactNode
}

interface WelcomeModalProps{
    isOpen:boolean,
    handleClose : ()=>void
}

interface SubmitAndCancelType{
    handleClose:()=>void
    handleSubmit:()=>void
    submitButtonTitle?:string
}