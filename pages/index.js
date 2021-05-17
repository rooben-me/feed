import Login from "../components/Login";

import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Main from "../components/Main";

export default function Home() {
  const [user] = useAuthState(auth);

  return (
    <div>
      <main>{!user ? <Login /> : <Main />}</main>
    </div>
  );
}
