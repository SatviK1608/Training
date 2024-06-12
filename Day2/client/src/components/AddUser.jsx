import React, { useState } from "react";

const AddUser = () => {
  const [user, setUser] = useState("");
  return (
    <form
      onSubmit={async (e) => {
        //e.preventDefault();
        console.log(user);
        const result = JSON.stringify({ user: user });
        try {
          const response = await fetch("http://localhost:3000/addUser", {
            method: "post",
            body: result,
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => data);
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <input
        type="text"
        placeholder="Add user"
        onChange={(e) => {
          console.log(user);
          setUser(e.target.value);
        }}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddUser;
