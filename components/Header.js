import Image from "next/image";

import { SearchIcon, LogoutIcon } from "@heroicons/react/outline";

import { auth } from "../lib/firebase";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();
  const { photoURL, displayName } = auth.currentUser;

  const signOut = () => {
    auth.signOut();
    router.reload();
  };

  return (
    <div className="sticky z-50 top-0 flex items-center bg-white p-2 shadow-lg">
      {/* left */}
      <div className="flex flex-1 items-center">
        <Image
          src="http://links.papareact.com/5me"
          width={40}
          height={40}
          layout="fixed"
        />
        <div className="flex ml-2 p-2 bg-gray-100 rounded-full">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            className="hidden md:block ml-2 bg-transparent"
            type="text"
            placeholder="Search facebook"
          />
        </div>
      </div>

      {/* right */}
      <div className="flex items-center">
        <div
          className=" px-4 py-2 mr-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          onClick={signOut}
        >
          <LogoutIcon className="h-6 text-gray-500" />
        </div>
        <div className="flex items-center justify-center ">
          <div className="">
            <Image
              className=" rounded-full"
              src={photoURL}
              width={40}
              height={40}
              layout="fixed"
            />
          </div>

          <p className="ml-2 whitespace-nowrap font-semibold">{displayName}</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
