import React, { useState } from "react";

const AddUser = () => {
  const [user, setUser] = useState("");
  return (
    <form style={styles.form}
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
      <input style={styles.input}
        type="text"
        placeholder="Add user"
        onChange={(e) => {
          console.log(user);
          setUser(e.target.value);
        }}
      />
      <button type="submit" style={styles.button}>Add</button>
    </form>
  );
};


const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px",
  },
  input: {
    padding: "10px",
    margin: "5px",
    width: "300px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    outline: "none",
  },
  button: {
    padding: "10px 20px",
    margin: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    outline: "none",
  },
};

export default AddUser;
