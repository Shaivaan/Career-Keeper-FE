interface DisplayValueWithLabelType{
    lable:string,
    value:string,
    isUsedForNavigation?:boolean
}

interface EditProfileFormType{
    isOpen:boolean,
    handleClose:()=>void
}

interface PersonalInformationType{
    handleEditProfileModalOpen:()=>void
}

interface WorkShowCaseFormType{
    handleOpenWorkShowCaseModalOpen:()=>void
}

interface EditProfileFormIntiValueType{
    first_name :NullOrString,
    last_name : NullOrString,
    profile_picture:FileType,
    email : NullOrString,
    about: NullOrString
}

type SetFieldValueType = (
    field: string,
    value: EditProfileFormIntiValueType["profile_picture"],
    shouldValidate?: boolean
  ) => void

  interface ProfilePictureEditAvatarType{
    setFieldValue :SetFieldValueType,
    profile_picture : EditProfileFormIntiValueType['profile_picture']
  }