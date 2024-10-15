import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import GoogleButton from "react-google-button";
import { auth } from "../firebase/config";

export default function GoogleSign() {
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((res) => {
      if(res){
        // todo handle the success
      }
    }).catch((err)=>{
        console.error(err)
    })
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
