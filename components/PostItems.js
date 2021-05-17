import Image from "next/image";

function PostItems({ key, name, message, postimage, profileURL, timestamp }) {
  return (
    <div className="flex flex-col">
      <div className="p-2 mx-2 md:p-4 md:mx-4 bg-white mt-2 md:mt-4 rounded-lg md:rounded-xl shadow-lg">
        <div className="flex items-center">
          <img
            className="rounded-full"
            height={40}
            width={40}
            src={profileURL}
            alt=""
          />
          <div className="ml-2">
            <p className=" font-semibold">{name}</p>
            <p className=" text-xs text-gray-400">
              {new Date(timestamp?.toDate()).toLocaleString()}
            </p>
          </div>
        </div>

        <p className="mt-4">{message}</p>
        {postimage && (
          <div className="mt-2 relative h-56 md:h-96 bg-white">
            <Image src={postimage} objectFit="contain" layout="fill" />
          </div>
        )}
      </div>
    </div>
  );
}

export default PostItems;
