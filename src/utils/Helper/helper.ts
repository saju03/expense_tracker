import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { userSignIn, userSignUp } from "../../../interface";
import { auth, db } from "../../firebase/config";
import { NavigateFunction } from "react-router-dom";
import { UseFormReset } from "react-hook-form";
import { doc, setDoc } from "firebase/firestore";
import { setUserDetails } from "../redux/userSlice";
import { Dispatch, UnknownAction } from "redux";

export const HandleSignUp = async (data: userSignUp, navigate: NavigateFunction, reset: UseFormReset<userSignUp>, setLoader: React.Dispatch<React.SetStateAction<boolean>>,dispatch: Dispatch<UnknownAction>) => {
  try {
    setLoader(true);
    await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user: User | null = auth.currentUser;

    reset();
    if (user) {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        fullName: data.fName,
        profession: data.profession,
      });
    }

    // todo alerts
    dispatch(setUserDetails({ fName: data.fName, email: data.email, profileImage: "null", isLoggedIn: true }));
    navigate("/login");
    setLoader(false);
  } catch (error) {
    navigate("/login");
    setLoader(false);
    console.error(error);
  }
};

export const HandleLogIn = async (data: userSignIn, navigate: NavigateFunction, reset: UseFormReset<userSignIn>, setLoader: React.Dispatch<React.SetStateAction<boolean>>) => {
  // todo alerts
  try {
    setLoader(true);
    const loginStatus = await signInWithEmailAndPassword(auth, data.email, data.password);
    if (loginStatus) {
      // todo redirect dashboard
      setLoader(false);
    }
  } catch (error) {
    console.error(error);
    setLoader(false);
  }
};

export const userLogOut = async () => {
  signOut(auth)
    .then(() => {
      console.log("logout ");
    })
    .catch((error) => {
      console.error(error);
    });
};
