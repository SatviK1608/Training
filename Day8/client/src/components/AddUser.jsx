import React, { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [user, setUser] = useState("");
  const [files,setFile]=useState();
  return (
    <form style={styles.form}
      onSubmit={async (e) => {
        //e.preventDefault();
        const id=Math.round(Math.random()*100)
        
        const result ={ user: user,id:id,file:files};
        axios
      .post("http://localhost:3000/addUser", result, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
       
      })
      .catch((error) => {
        
      });
      }}
    encType="multipart/form-data">
      <input style={styles.input}
        type="text"
        placeholder="Add user"
        onChange={(e) => {
          console.log(user);
          setUser(e.target.value);
        }}
      />
      <input style={styles.input} name="file" type="file" onChange={(e) => {
          console.log(e.target.files[0]);
          setFile(e.target.files[0]);
        }}></input>
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
