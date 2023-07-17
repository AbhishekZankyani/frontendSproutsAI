import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const SignUPPage = () => {
    const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [response, setResponse] = useState(null);
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast("Password and Confirm Password should be same")
      return;
    }
    if(!firstName)
    {
        toast("First Name is necessary")
        return
    }
    if(!lastName)
    {
        toast("Last Name is necessary")
        return
    }
    if(!phone)
    {
        toast("Phone Number is necessary")
        return
    }
    if(!password)
    {
        toast("Password is necessary")
        return
    }
    if(!confirmPassword)
    {
        toast("Confirm Password is necessary")
        return
    }
    if(!email)
    {
        toast("Email is necessary")
        return
    }
    try {
      const res = await axios.post(
        "https://backend-sproutsai.onrender.com/Users",
        JSON.stringify({
          FirstName: firstName,
          LastName: lastName,
          Email: email.toLowerCase(),
          Phone: phone,
          Password: password,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(res);
        // toast(res.data.message)
        toast("User Created sucessfully")
        alert("User Created sucessfully")
        navigate("/");
    } catch (err) {
      console.log(err);
    //   responseElement.textContent = err.message;
    toast("User Already Exist")

    }
  };
  
  return (
    <MDBContainer fluid>
    <ToastContainer />
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Sign up
              </p>
              <ToastContainer />
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user me-3" size="lg" />
                <div className="w-40 me-2">
                  <MDBInput
                    label="First Name"
                    id="formFirstName" required
                    type="text"
                    onChange={(e) => {
                      setFirstName(e.target.value); // Store the entered value in the 'email' variable
                    }}
                  />
                </div>
                <div className="w-40">
                  <MDBInput
                    label="Last Name"
                    id="formLastName" required
                    type="text"
                    onChange={(e) => {
                      setLastName(e.target.value); // Store the entered value in the 'email' variable
                    }}
                  />
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size="lg" />
                
                <MDBInput
                  label="Your Email"
                  id="typeEmail"
                  type="email" required
                  onChange={(e) => {
                    setEmail(e.target.value); // Store the entered value in the 'email' variable
                  }}
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size="lg" />
                <MDBInput
                  label="Password"
                  id="form3"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value); // Store the entered value in the 'email' variable
                  }}
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size="lg" />
                <MDBInput
                  label="Repeat your password"
                  id="form4"
                  type="password" 
                  onChange={(e) => {
                    setConfirmPassword(e.target.value); // Store the entered value in the 'email' variable
                  }}
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon icon="phone-alt" size="lg" className="me-3" />
                <MDBInput
                  label="Enter your Phone"
                  id="typePhone"
                  type="tel"
                  maxLength={10}
                  onChange={(e) => {
                    // Validate and store the phone value
                    const phone = e.target.value;
                    setPhone(phone);
                  }}
                />
              </div>

              <MDBBtn className="mb-4" size="lg" onClick={handleSubmit}>
                Register
              </MDBBtn>
            </MDBCol>

            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                fluid
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default SignUPPage;
