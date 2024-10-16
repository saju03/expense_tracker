import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleButton from "react-google-button";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../utils/redux/userSlice";

export default function GoogleSign() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        if (res) {
          const user = res.user;
          const fullName = user.displayName;
          const email = user.email;
          const profession = "";
          dispatch(setUserDetails({ fName: fullName, email: email, profession: profession, isLoggedIn: true }));
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="mx-auto py-5">
      <GoogleButton
        onClick={() => {
          googleLogin();
        }}
      />
    </div>
  );
}
