import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { firebaseAuth, firebaseFirestore } from "./firebase";
import {setDoc, doc, serverTimestamp} from 'firebase/firestore';

const handleSubmitUserRegister = async (values: SignUpFormValuesType,handleError: (error: unknown) => void,handleSuccess: VoidReturnType,handleFinally: VoidReturnType
) => {
  const { email, password,first_name,last_name } = values;
  try {
    let createUser = await createUserWithEmailAndPassword(firebaseAuth,email,password);
    const user = createUser.user;
       await updateProfile(createUser.user, {
        displayName: `${first_name} ${last_name}`,
      });
      await createUserInDatabase(values, user.uid,handleError,handleSuccess);
  } catch (error: unknown) {
    handleError(error);
  } finally {
    handleFinally();
  }
};

const createUserInDatabase = async (values: SignUpFormValuesType, uid: string,handleError: (error: unknown) => void,handleSuccess: VoidReturnType) => {
  const { email, first_name, last_name } = values;
  try {
    await setDoc(doc(firebaseFirestore, 'users', uid), {
      firstName: first_name,
      lastName: last_name,
      email: email,
      createdAt: serverTimestamp(),
    });
    handleSuccess();
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
