import { useState } from "react";
import Image from "next/image";

import { useRef } from "react";
import firebase from "firebase/app";
import { auth, firestore, storage } from "../lib/firebase";
import { CameraIcon } from "@heroicons/react/solid";
import { XCircleIcon } from "@heroicons/react/outline/";

function Inputbox() {
  const { photoURL, displayName, email, uid } = auth.currentUser;
  const inputRef = useRef(null);
  const fileRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  const sendPost = (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;

    firestore
      .collection("posts")
      .add({
        message: inputRef.current.value,
        name: displayName,
        PhotoURL: photoURL,
        email: email,
        uid: uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        if (imageToPost) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imageToPost, "data_url");

          removeImage();

          uploadTask.on(
            "state_change",
            null,
            (error) => console.error(error),
            () => {
              //upload complete
              storage
                .ref("posts")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  firestore.collection("posts").doc(doc.id).set(
                    {
                      postimage: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
        }
      });
    inputRef.current.value = "";
  };

  const addImagetoPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <div className="m-2 md:m-4 bg-white p-2 md:p-4 rounded-lg md:rounded-xl ">
      <div className="flex items-center space-x-4">
        <Image
          className="rounded-full"
          src={photoURL}
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            type="text"
            placeholder={`Say something, ${displayName}`}
            ref={inputRef}
            className="bg-gray-100 h-12 px-2 md:px-4  flex flex-1 rounded-xl"
          />
          <div
            onClick={() => {
              fileRef.current.click();
            }}
            className="flex items-center px-2 mx-2 rounded-lg cursor-pointer bg-gray-100"
          >
            <CameraIcon className="h-8 text-green-500 " />
            <input ref={fileRef} onChange={addImagetoPost} type="file" hidden />
          </div>

          <button
            className="px-4 hover:bg-gray-100 rounded-xl"
            onClick={sendPost}
          >
            Send
          </button>
        </form>
      </div>
      {imageToPost && (
        <div className="relative">
          <img
            className="mt-4 h-[200px] w-full rounded-lg object-cover"
            src={imageToPost}
          />
          <XCircleIcon
            onClick={removeImage}
            className="h-12 absolute top-0 right-0 p-2 cursor-pointer text-red-500"
          />
        </div>
      )}
    </div>
  );
}

export default Inputbox;
