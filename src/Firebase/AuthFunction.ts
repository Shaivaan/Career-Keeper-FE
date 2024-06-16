import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseAuth, firebaseFirestore } from "./firebase";
import {setDoc, doc, serverTimestamp} from 'firebase/firestore';
import { userCollection } from "../Zustand/Constants";


const userProfileInitialData  = {
  profile_picture:null,
  about: null,
  showCase : {
    linked_in : null,
    github : null,
    resume : null,
    instagram : null,
    youtube : null,
    cover_letter : null
  }
}

const handleSubmitUserRegister = async (values: SignUpFormValuesType,handleError: (error: unknown) => void,handleSuccess: VoidReturnType,handleFinally: VoidReturnType
) => {
  const { email, password } = values;
  try {
    let createUser = await createUserWithEmailAndPassword(firebaseAuth,email,password);
    const user = createUser.user;
      handleSuccess();
      await createUserInDatabase(values, user.uid,handleError);
  } catch (error: unknown) {
    handleError(error);
  } finally {
    handleFinally();
  }
};

const createUserInDatabase = async (values: SignUpFormValuesType, uid: string,handleError: (error: unknown) => void) => {
  const { email, first_name, last_name } = values;
  let userDataToStore = {
    first_name,
    last_name,
    email,
    ...userProfileInitialData,
    createdAt: serverTimestamp(),
  };
  try {
    await setDoc(doc(firebaseFirestore, userCollection, uid), userDataToStore);
  } catch (error) {
    handleError(error)
  }
};



const handleSignInUser = async (values:LoginValueType, handleSuccess:VoidReturnType,handleError:(error:unknown)=>void,handleFinally:VoidReturnType) => {
    const { email, password } = values;
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      handleSuccess();
    } catch (error) {
        handleError(error)
    }
    finally{
        handleFinally();
    }
  };


  const handleLogout = async (handleSuccess:VoidFunction,handleError:VoidFunction) => {
    try {
      await signOut(firebaseAuth);
      handleSuccess();
    } catch (error) {
      handleError();
    }
  };



export { handleSubmitUserRegister,handleSignInUser,handleLogout };
