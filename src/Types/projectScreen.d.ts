type NullOrString = null | string
type FileType = string | File | null
interface EditModalType{
    isOpen:boolean,
    handleClose : ()=>void
}

interface AddProjectButtonParent{
    handleOpen : ()=>void
}

interface TextFieldErrorToucheType{
    error : string,
    touched : boolean
}

interface AddProjectInitialValueType{
    title : NullOrString,
    description : NullOrString,
    demo_link : NullOrString,
    code_link : NullOrString,
    tech_used : [] | string[],
    project_image : FileType
}

interface HiddenInputType {
    inputRef : null | MutableRefObject<HTMLInputElement | null>
    handleFileChange : (event:React.ChangeEvent<HTMLInputElement>)=>void
}

interface UploadImageBoxType{
    handleBoxClick:()=>void
    project_image : FileType
}

interface DeleteModalType {
    isOpen:boolean
    closeModal : ()=>void
}

interface CardParentCompType{
    handleDeleteModalOpen:()=>void
}