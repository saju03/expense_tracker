export interface userSignUp {
    fName:string,
    email:string,
    profession:string,
    password:string
}
export interface userSignIn {
    email:string,
    password:string
}
export interface LoaderContextType {
    isLoader: boolean;
    setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}