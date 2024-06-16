interface DisplayValueWithLabelType{
    lable:NullOrString,
    value:NullOrString,
    isUsedForNavigation?:boolean
}

interface ModalOpenAndCloseTypes{
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

interface EditWorkShowCaseFormType{
    workShowCaseData : ShowCaseFormType
    updateProfileData:(updates: ShowCaseFormType) => Promise<void>
}

interface EditProfileFormType{
    profileFormInitialValues : EditProfileFormIntiValueType
    updateProfileData:(updates: EditProfileFormIntiValueType) => Promise<void>
}

interface ShowCaseFormType{
    linked_in : NullOrString,
    github : NullOrString,
    resume : NullOrString,
    instagram : NullOrString,
    youtube : NullOrString
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

  type ProfileDataStateType = { showCase:ShowCaseFormType} & EditProfileFormIntiValueType
  interface ProfileDisplaySectionType{
    profileData : ProfileDataStateType
  }