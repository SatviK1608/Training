import React, { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const info = JSON.parse(localStorage.getItem("user_id"));
  const id = info.id;
  useEffect(() => {
    const response=fetch(`http://localhost:3000/getPosts/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setPosts(data.data)
      });
      
  }, []);
  const bufferToArray = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    var base64Image = window.btoa(binary, "src");
    console.log(base64Image)
    return `data:image/jpeg;base64,${base64Image}`;
  };
  return (
    <>
      {posts &&
        posts.map((item) => {
          return(
          <>
          <img alt="no" src={bufferToArray(item.file.data)} height="400px" width="400px"/>
          <span>{item.fileName}</span>
          <br/>
          </>
          )
        })}
    </>
  );
};

export default Posts;
