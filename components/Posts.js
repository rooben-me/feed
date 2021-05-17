import React from "react";
import { firestore } from "../lib/firebase";
import { useEffect, useState } from "react";

import PostItems from "./PostItems";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    firestore
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <PostItems
          key={post.uid}
          name={post.data.name}
          message={post.data.message}
          postimage={post.data.postimage}
          timestamp={post.data.timestamp}
          profileURL={post.data.PhotoURL}
        />
      ))}
    </div>
  );
}

export default Posts;
