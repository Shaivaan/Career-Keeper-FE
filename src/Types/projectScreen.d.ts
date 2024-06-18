type NullOrString = null | string
type FileType = string | File | null
interface EditModalType{
    isOpen:boolean,
    handleClose : ()=>void
    isEditState : boolean
    addEditFunction:(values:AddProjectInitialValueType)=>void
    projectFormInitialValues: AddProjectInitialValueType
}

interface AddProjectButtonParent{
    handleOpen : ()=>void
    buttonTitle:string
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
    onClickYes : ()=>void
}

interface CardParentCompType{
    projectData:AddProjectInitialValueType[] | []
}

interface CardGenType{
    handleDeleteModalOpen:(project_id:string)=>void
    handleEditState:(isEditState:boolean,projectFormInitialValues?:AddProjectInitialValueType)=>void
}

interface EachCardType{
    cardDetails: AddProjectInitialValueType
}

interface NoProjectsAddedType{
    isLoading : boolean
    fallBackText?:string
}