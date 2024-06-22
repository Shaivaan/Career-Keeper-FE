interface SignUpFormValuesType{
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

interface LoginValueType{
    email: string;
    password: string;
}

interface ForgotPWValueType{
    email: string;
}

type VoidReturnType = ()=>void