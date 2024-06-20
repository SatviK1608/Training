import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import AddUser from "./AddUser";
const DetailUser = () => {
  const [user, setUser] = useState([]);
  const [updateUser, setUpdateUser] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/getUsers", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => data);
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);
  const update = async (id) => {
    console.log(id,"hii")
    const result = JSON.stringify({ id: id, user: updateUser });
    try {
      const response = await fetch("http://localhost:3000/updateUser", {
        method: "put",
        body: result,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => data);

      try {
        const response1 = await fetch("http://localhost:3000/getUsers", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => data);
        console.log(response1.data);
        setUser(response1.data);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = async (id) => {
    const result = JSON.stringify({ id: id });
    try {
      const response = await fetch("http://localhost:3000/deleteUser", {
        method: "delete",
        body: result,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => data);
      try {
        const response1 = await fetch("http://localhost:3000/getUsers", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => data);
        console.log(response1.data);
        setUser(response1.data);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e, id) => {
    console.log(e.target.value);
    var result = user;
    result = result.map((x) => {
      if (x.id === id) {
        x.username = e.target.value;
        setUpdateUser(e.target.value);
      }
      return x;
    });
    setUser(result);
  };
  const displayPosts=async (id)=>{
    localStorage.setItem("user_id",JSON.stringify({id:parseInt(id)}))
  };

  return (
    <>
    <AddUser/>
      <div style={styles.container}>
        {user.map((item) => {
          return (
            <div style={styles.userContainer}>
              <input style={styles.input}
                type="text"
                value={item.username}
                onChange={(e) => handleChange(e, item.id)}
              />
              <button onClick={() => update(item.id)} style={styles.button}>Update</button>
              <button onClick={() => deleteUser(item.id)} style={styles.button}>Delete</button>
              <Link to="/posts" onClick={() => displayPosts(item.id)}>View Uploads</Link>
              <br />
            </div>
          );
        })}
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  userContainer: {
    display: "flex",
    alignItems: "center",
    margin: "10px",
  },
  input: {
    padding: "8px",
    marginRight: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "14px",
    cursor: "pointer",
    outline: "none",
  },
};



export default DetailUser;
