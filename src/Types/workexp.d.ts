
interface WorkExpModalType{
    isOpen:boolean,
    handleClose : ()=>void
    handleSubmit:(value:WorkExpFormType)=>void
    isEditState:boolean
    initial_value:WorkExpFormType
}

interface WorkExpFormType{
    company_name : NullOrString,
    company_logo : FileType,
    exp_desciption : NullOrString,
    joining_date : NullOrString | Date,
    end_date : NullOrString | Date,
    is_currently_working : boolean
}

type WorkExpState = [] | WorkExpFormType[]
interface ExperienceCardType{
    eachExp:WorkExpFormType;
    deletModalOpenAndClose:(isOpen:boolean,workExpId? : string)=>void
    handleWorkExpFormValue:(value:WorkExpFormType)=>void
}

interface FirestoreTimestamp{
    seconds: number;
    nanoseconds: number;
}

type FirebaseTime = firebase.firestore.Timestamp