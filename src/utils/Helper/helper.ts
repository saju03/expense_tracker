import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { Expense, userSignIn, userSignUp } from "../../../interface";
import { auth, db } from "../../firebase/config";
import { NavigateFunction } from "react-router-dom";
import { UseFormReset } from "react-hook-form";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { format } from "date-fns";

export const HandleSignUp = async (
  data: userSignUp,
  navigate: NavigateFunction,
  reset: UseFormReset<userSignUp>,
  setLoader: React.Dispatch<React.SetStateAction<boolean>>
) => {
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
  } catch (error) {
    navigate("/login");
    setLoader(false);
    console.error(error);
  }
};

export const HandleLogIn = async (
  data: userSignIn,
  reset: UseFormReset<userSignIn>,
  setLoader: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // todo alerts
  try {
    setLoader(true);
    const loginStatus = await signInWithEmailAndPassword(auth, data.email, data.password);
    if (loginStatus) {
      reset();
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

export const fetchExpense = async (): Promise<Expense[] | null> => {
  try {
    const user = getAuth().currentUser;

    if (user) {
      const userRef = doc(db, "expense", user.uid);
      const docSnapshot = await getDoc(userRef);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();

        return data.expenses || [];
      } else {
        console.log("No expenses found for this user.");
        return [];
      }
    } else {
      console.error("User not authenticated");
      return null;
    }
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return null;
  }
};

export const formatDate = (date: string) => {
  const dateValue = new Date(date);

  return format(dateValue, "MMM dd EEE");
};
