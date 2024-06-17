interface WorkExpModalType{
    isOpen:boolean,
    handleClose : ()=>void
    handleSubmit:(value:WorkExpFormType)=>void
    isEditState:boolean
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
    eachExp:WorkExpFormType 
}

interface FirestoreTimestamp{
    seconds: number;
    nanoseconds: number;
}