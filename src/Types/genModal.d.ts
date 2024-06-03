interface GeneralModalParentType{
    isOpen:boolean,
    handleClose : ()=>void
    children:ReactNode
}

interface SubmitAndCancelType{
    handleClose:()=>void
    handleSubmit:()=>void
}