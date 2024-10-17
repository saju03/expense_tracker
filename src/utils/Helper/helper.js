import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
 import { auth, db } from "../../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { format } from "date-fns";

export const HandleSignUp = async (
  data ,
  navigate ,
  reset ,
  setLoader 
) => {
  try {
    setLoader(true);
    await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user = auth.currentUser;

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
  data ,
  reset ,
  setLoader 
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

export const fetchExpense = async () => {
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

export const formatDate = (date) => {
  const dateValue = new Date(date);

  return format(dateValue, "MMM dd EEE");
};

export const getTotal = (key, value, array = []) => {
  return array.reduce((total, e) => {
    if (e[key] === value) {
      total += parseFloat(e.amount) || 0;
    }
    return total;
  }, 0);
};

export const finalFilter = (filterValues, result) => {
  
  const spentFilter = spentTypeFilter(result, filterValues.spentType);
  const category = categoryFilter(result, filterValues.category);
  const dateRanges = filterResultsByDateRange(result, filterValues?.dateRange?.[0]);
  return spentFilter && category && dateRanges;
};

const spentTypeFilter = (result, valueArray) => {
  if (valueArray.length > 0 && result) {
    return valueArray.includes(result.spentType);
  }
  return true;
};

const categoryFilter = (result, valueArray) => {
  if (valueArray.length > 0 && result) {
    return valueArray.includes(result.category);
  }
  return true;
};

 
const filterResultsByDateRange = (result , dateRanges ) => {
  if (result && dateRanges) {
    
    const fromDate = new Date(dateRanges.from);
    const toDate = new Date(dateRanges.to);

    toDate.setHours(23, 59, 59, 999);

    const resultDate = new Date(result.date);

    return resultDate >= fromDate && resultDate <= toDate;
  }
  return true;
};
