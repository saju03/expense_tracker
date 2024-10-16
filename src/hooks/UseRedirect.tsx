import React, { useContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { redirect, useNavigate } from "react-router-dom";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../utils/redux/userSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import showLoader from "../utils/context/LoaderContext";

const UseRedirect: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const dispatch: Dispatch = useDispatch();
  const { setLoader } = useContext(showLoader);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user ) {
        setLoader(true);
        const { uid } = user;
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);
        // todo alerts
        if (userSnap.exists()) {
          const { email, fullName, profession } = userSnap.data();
          dispatch(setUserDetails({ fName: fullName, email: email, profession: profession, isLoggedIn: true }));
        }else{
            dispatch(setUserDetails({ fName: user.displayName, email: user.email, profession: null, isLoggedIn: true }));
        }
        redirect("/");
        setLoader(false);
      } else {
        dispatch(setUserDetails({ fName: null, email: null, profession: null, isLoggedIn: false }));
        setLoader(false);
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [auth]);

  return null;
};

export default UseRedirect;
