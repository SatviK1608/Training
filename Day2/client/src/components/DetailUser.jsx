import React, { useEffect, useState } from "react";

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
      if (x._id === id) {
        x.user = e.target.value;
        setUpdateUser(e.target.value);
      }
      return x;
    });
    setUser(result);
  };

  return (
    <>
      <p>
        {user.map((item) => {
          return (
            <>
              <input
                type="text"
                value={item.user}
                onChange={(e) => handleChange(e, item._id)}
              />
              <button onClick={() => update(item._id)}>Update</button>
              <button onClick={() => deleteUser(item._id)}>Delete</button>
              <br />
            </>
          );
        })}
      </p>
    </>
  );
};

export default DetailUser;
