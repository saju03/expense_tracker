import  { createContext} from "react";
import { LoaderContextType } from "../../../interface";
const showLoader = createContext<LoaderContextType>({
    isLoader:false,
    setLoader:()=>{}
    
})
export default showLoader