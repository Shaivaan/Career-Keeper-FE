import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseAuth } from "./firebase";

const handleSubmitUserRegister = async (values: SignUpFormValuesType,handleError: (error: unknown) => void,handleSuccess: VoidReturnType,handleFinally: VoidReturnType
) => {
  const { email, password, first_name, last_name } = values;
  try {
    let createUser = await createUserWithEmailAndPassword(firebaseAuth,email,password);await updateProfile(createUser.user, {
      displayName: `${first_name} ${last_name}`,
    });
    handleSuccess();
  } catch (error: unknown) {
    handleError(error);
  } finally {
    handleFinally();
  }
};



const handleSignInUser = async (values:LoginValueType, handleSuccess:VoidReturnType,handleError:(error:unknown)=>void,handleFinally:VoidReturnType) => {
    const { email, password } = values;
    try {
      let userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      let user = userCredential.user;
      const token = await user.getIdToken();
      setAuthTokenCookie(token);
      handleSuccess();
    } catch (error) {
        handleError(error)
    }
    finally{
        handleFinally();
    }
  };


  const setAuthTokenCookie=(token:string) =>{
    const oneDayTime = 24 * 60 * 60 * 1000;
    let expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + oneDayTime);
    let expires = "expires=" + expirationDate.toUTCString();
    document.cookie = `authToken=${token}; ${expires}; path=/; Secure; SameSite=Strict`;
  }


  const isUserLoggedIn=() =>{
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('authToken=')) {
        return true;
      }
    }
    return false; 
  }

  function clearCookieAndLogOut() {
    document.cookie = `authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict`;
    document.location.pathname = '/login';
  }



export { handleSubmitUserRegister,handleSignInUser,isUserLoggedIn,clearCookieAndLogOut };
