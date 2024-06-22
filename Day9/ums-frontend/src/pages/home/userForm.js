import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import axios from "axios";
import { UpdateContext } from "../../updateContext";
const root = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  "& .MuiTextField-root": { m: 1, width: "50ch" },
  borderRadius: "5px",
  padding: "50px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
};

const alertStyles = {
  border: "2px solid #0096FF",
  borderRadius: "5px",
  backgroundColor: "lightBlue",
  padding: "5px",
};

const qualificationsOptions = [
  "Bachelor of Science in Computer Science",
  "Master of Business Administration",
  "Doctor of Philosophy in Physics",
  "Bachelor of Arts in English Literature",
  "Master of Science in Data Science",
  "Doctor of Medicine",
  "Bachelor of Engineering in Mechanical Engineering",
  "Master of Fine Arts in Creative Writing",
  "Doctor of Education",
  "Bachelor of Laws",
];

const UserForm = () => {
  const { update, id } = useContext(UpdateContext);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    addresses: [{ value: "" }],
    paymentMethod: "",
    section: "",
    qualifications: [{ value: "" }],
    profileImage: null,
  });
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (update && id) {
      axios
        .post("http://localhost:5000/user/getProfile", { id })
        .then((res) => {
          const data = res.data.data;
          console.log(data, "view");
          var qualifications = data.qualification;
          const section = data.section;
          const addresses = data.result.addresses.map((item) => {
            return { value: item };
          });
          qualifications = qualifications.map((item) => {
            return { value: item };
          });
          setFormData({
            ...data.result,
            qualifications: qualifications,
            section: section,
            addresses: addresses,
            paymentMethod: data.result.paymentMethods[0],
          });
          // Ensure addresses and qualifications have at least one entry
          // if (data.addresses.length === 0) {
          //   data.addresses = [{ value: "" }];
          // }
          // if (data.qualifications.length === 0) {
          //   data.qualifications = [{ value: "" }];
          // }
          // setFormData(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [update, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    console.log(e.target.files[0])
    setFormData({
      ...formData,
      profileImage: e.target.files[0],
    });
  };

  const isFormInvalid = () => {
    const basicFields = ["id", "name", "email", "paymentMethod", "section"];
    for (let field of basicFields) {
      if (!formData[field]) {
        return true;
      }
    }

    for (let address of formData.addresses) {
      if (!address.value) {
        return true;
      }
    }

    for (let qualification of formData.qualifications) {
      if (!qualification.value) {
        return true;
      }
    }

    return false;
  };

  const handleAddAddress = () => {
    if (formData.addresses.length < 3) {
      setFormData({
        ...formData,
        addresses: [...formData.addresses, { value: "" }],
      });
    }
  };

  const handleAddressChange = (e, index) => {
    const newAddresses = [...formData.addresses];
    newAddresses[index].value = e.target.value;
    setFormData({
      ...formData,
      addresses: newAddresses,
    });
  };

  const handleRemoveAddress = (index) => {
    const newAddresses = [...formData.addresses];
    newAddresses.splice(index, 1);
    setFormData({
      ...formData,
      addresses: newAddresses,
    });
  };

  const handleAddQualification = () => {
    if (formData.qualifications.length < 3) {
      setFormData({
        ...formData,
        qualifications: [...formData.qualifications, { value: "" }],
      });
    }
  };

  const handleQualificationChange = (e, index) => {
    const newQualifications = [...formData.qualifications];
    newQualifications[index].value = e.target.value;
    setFormData({
      ...formData,
      qualifications: newQualifications,
    });
  };

  const handleRemoveQualification = (index) => {
    const newQualifications = [...formData.qualifications];
    newQualifications.splice(index, 1);
    setFormData({
      ...formData,
      qualifications: newQualifications,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormInvalid()) return;
    if (update && id) {
      const newData = {
        id: formData.id,
        name: formData.name,
        email: formData.email,
        address: formData.addresses.map((item) => {
          return item.value;
        }),
        paymentMethod: [formData.paymentMethod],
        section: formData.section,
        qualifications: formData.qualifications.map((item) => {
          return item.value;
        }),
        profileImage:formData.profileImage,
      };
      // setFormData(newData);
      axios
        .put("http://localhost:5000/user/updateProfile", newData,{headers: {
          "Content-Type": "multipart/form-data",
        }})
        .then((res) => {
          console.log(newData,"new");
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
          }, 3000);
        })
        .catch((e) => {
          console.log(e);
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 3000);
        });
    } else {
      axios
        .post("http://localhost:5000/user/addUser", formData,
          {headers: {
            "Content-Type": "multipart/form-data",
          }}
        )
        .then((res) => {
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
          }, 3000);
        })
        .catch((e) => {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 3000);
        });
    }
  };

  return (
    <Box
      component="form"
      sx={root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      {alert && <p style={alertStyles}>User added successfully!</p>}
      {error && (
        <p
          style={{
            ...alertStyles,
            backgroundColor: "#FF8488",
            border: "1px solid #FF474D",
          }}
        >
          An error occurred while adding user!
        </p>
      )}
      <Typography variant="h4" gutterBottom>
        User Form
      </Typography>
      <TextField
        label="ID"
        variant="outlined"
        name="id"
        value={formData.id}
        onChange={handleChange}
      />
      <TextField
        label="Name"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {formData.addresses.map((address, index) => (
        <div key={`address-${index}`} style={{ maxWidth: "90%" }}>
          <TextField
            style={{ maxWidth: "100%" }}
            label={`Address ${index + 1}`}
            variant="outlined"
            value={address.value}
            onChange={(e) => handleAddressChange(e, index)}
          />
          {index > 0 && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveAddress(index)}
              sx={{ ml: 1 }}
            >
              Remove
            </Button>
          )}
        </div>
      ))}
      {formData.addresses.length < 3 && (
        <Button variant="contained" onClick={handleAddAddress} sx={{ mt: 1 }}>
          Add Address
        </Button>
      )}
      <FormControl sx={{ m: 1, minWidth: 430 }}>
        <InputLabel>Payment Method</InputLabel>
        <Select
          value={formData.paymentMethod}
          label="Payment Method"
          name="paymentMethod"
          onChange={handleChange}
        >
          <MenuItem value={"Credit Card"}>Credit Card</MenuItem>
          <MenuItem value={"Debit Card"}>Debit Card</MenuItem>
          <MenuItem value={"PayPal"}>PayPal</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Section"
        variant="outlined"
        name="section"
        value={formData.section}
        onChange={handleChange}
      />
      {formData.qualifications.map((qualification, index) => (
        <div key={`qualification-${index}`} style={{ maxWidth: "90%" }}>
          <FormControl sx={{ m: 1, minWidth: 430 }}>
            <InputLabel>Qualification {index + 1}</InputLabel>
            <Select
              value={qualification.value}
              label={`Qualification ${index + 1}`}
              onChange={(e) => handleQualificationChange(e, index)}
            >
              {qualificationsOptions.map((option, idx) => (
                <MenuItem key={`option-${idx}`} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {index > 0 && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveQualification(index)}
              sx={{ ml: 1 }}
            >
              Remove
            </Button>
          )}
        </div>
      ))}

      {formData.qualifications.length < 3 && (
        <Button
          variant="contained"
          onClick={handleAddQualification}
          sx={{ mt: 1 }}
        >
          Add Qualification
        </Button>
      )}
      <TextField
        variant="outlined"
        type="file"
        name="profileImage"
        onChange={handleImageChange}
        sx={{ mt: 2 }}
      />
      <Button variant="contained" type="submit" sx={{ mt: 3 }}>
        Submit
      </Button>
    </Box>
  );
};

export default UserForm;
