import React, { useState } from "react";
import SignOutUser from "./SignOut";

export default function Home() {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  console.log(userData);
  return (
    <div>
      Home<p>Welcome {userData.firstName}</p>
      <SignOutUser />
    </div>
  );
}
