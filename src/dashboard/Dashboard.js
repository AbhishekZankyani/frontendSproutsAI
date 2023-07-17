import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";

import {
  MDBBtn,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTooltip,
} from "mdb-react-ui-kit";

const statusOptions = [
  { label: "All", value: 1 },
  { label: "Completed", value: 2 },
  { label: "Pending", value: 3 },
  { label: "Expired", value: 4 },
];

const dateOptions = [
  { label: "Added date", value: 1 },
  { label: "Due date", value: 2 },
];

const Dashboard = () => {
  const [selectedStatusOption, setSelectedStatusOption] = useState(null);
  const [selectedUserOption, setSelectedUserOption] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedDateOption, setSelectedDateOption] = useState(null);
  const [response, setResponse] = useState([]);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [taskName, setTaskName] = useState("");
  const [optComplete, setOptComplete] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [checked, setChecked] = useState(false);
  const [filteredChoice, setfilteredChoice] = useState("");
  const [multiSelect, setMultiSelect] = useState(0);

  const checkdate = (dateToCheck) => {
    if (moment(dateToCheck).isAfter(moment(new Date()).format())) {
      return true;
    } else return false;
  };

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const completetask = async (task) => {
    try {
      console.log(task);
      console.log(JSON.parse(localStorage.getItem("token")));
      const res = await axios.put(
        `https://backend-sproutsai.onrender.com/Tasks/${task._id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      console.log(res);
      toast("Task Completed Successfully");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  //   console.log(moment(startDate?.value).utc());
  const createTask = async () => {
    if (!taskName) {
      toast("Task Name is required");
      //   alert("Task Name is required");
      toggleModal();
      return;
    }
    if (!checkdate(moment(startDate).format())) {
      toast("Old Dates are not Allowed");
      //   alert("Old Dates are not Allowed");
      toggleModal();
      return;
    }
    if (!selectedUserOption) {
      toast("Select The User First");
      //   alert("Select The User First");
      toggleModal();
      return;
    }
    try {
      const res = await axios.post(
        "https://backend-sproutsai.onrender.com/Tasks",
        JSON.stringify({
          TaskName: taskName,
          AssignedTo: selectedUserOption?.value,
          Deadline: moment(startDate).format(),
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      console.log(res);
      toast("Task Created Sucessfully");
      //   alert("Task Created SUcessfully");
      toggleModal();
    } catch (err) {
      console.log(err);
    }
  };

  const getAllUsersToAssignTask = async () => {
    try {
      const data = await axios.get("https://backend-sproutsai.onrender.com/Users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      let a = [];
      data.data?.map((x) => {
        a.push({ label: x.FirstName + " " + x.LastName, value: x._id });
      });
      console.log(a);
      setAllUsers(a);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const logoutButton = async () => {
    try {
      localStorage.clear();
      navigate("/");
    } catch (err) {}
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.get("https://backend-sproutsai.onrender.com/Tasks", {
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      setResponse(res?.data);
      setMultiSelect(0);
      setOptComplete(true);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllTaskAssignedByME = async () => {
    try {
      const res = await axios.get(`https://backend-sproutsai.onrender.com/Tasks/byMe`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      setResponse(res?.data);
      setMultiSelect(1);
      setOptComplete(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (startDate) {
      console.log(moment(startDate).format());
    }
  }, [startDate]);

  useEffect(() => {
    handleSubmit();
    getAllUsersToAssignTask();
  }, []);

  const filerUsers = async () => {
    var choice = selectedStatusOption?.label;
    var apires = null;
    if (multiSelect === 0) {
      try {
        const res = await axios.get("https://backend-sproutsai.onrender.com/Tasks", {
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        });
        apires = res?.data;
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axios.get(`https://backend-sproutsai.onrender.com/Tasks/byMe`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        });
        apires = res?.data;
      } catch (err) {
        console.log(err);
      }
    }
    if (choice !== "All") {
      var data = apires.filter((ch) => ch.TaskStatus === choice);
      console.log(data);
      setResponse(data);
    }
    else{
        setResponse(apires)
    }
  };

  useEffect(() => {
    if (selectedStatusOption) {
      filerUsers();
    }
  }, [selectedStatusOption]);
  return (
    <MDBContainer className="py-5">
      <ToastContainer />
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol>
          <MDBCard
            id="list1"
            style={{ borderRadius: ".75rem", backgroundColor: "#eff1f2" }}
          >
            <div>
              <MDBBtn onClick={logoutButton} color="danger">
                Logout
              </MDBBtn>
            </div>
            <MDBCardBody className="py-4 px-4 px-md-5">
              <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                <MDBIcon fas icon="check-square" className="me-1" />
                <u>My Tasks</u>
              </p>

              <div className="pb-2">
                <MDBCard>
                  <MDBCardBody>
                    <div className="d-flex flex-row align-items-center">
                      <div className="App">
                        <Modal
                          isOpen={isOpen}
                          onRequestClose={toggleModal}
                          contentLabel="My dialog"
                          className="mymodal"
                          overlayClassName="myoverlay"
                          closeTimeoutMS={500}
                        >
                          <div>
                            <MDBContainer>
                              <div className="mask gradient-custom-3"></div>
                              <MDBCard>
                                <MDBCardBody className="px-5">
                                  <h2 className="text-uppercase text-center mb-5">
                                    Create New Task
                                  </h2>
                                  <MDBInput
                                    wrapperClass="mb-4"
                                    onChange={(e) => {
                                      setTaskName(e.target.value);
                                    }}
                                    label="Task Name"
                                    size="lg"
                                    id="form1"
                                    type="text"
                                  />
                                  {}

                                  <Select
                                    placeholder="Select User"
                                    value={selectedUserOption}
                                    onChange={(option) =>
                                      setSelectedUserOption(option)
                                    }
                                    options={allUsers}
                                  />
                                  <p></p>
                                  <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                  />
                                  <p></p>

                                  <p></p>
                                  {}
                                  <MDBBtn
                                    className="mb-4 w-100 gradient-custom-4"
                                    onClick={createTask}
                                    size="lg"
                                  >
                                    Submit
                                  </MDBBtn>
                                </MDBCardBody>
                              </MDBCard>
                            </MDBContainer>
                          </div>
                        </Modal>
                      </div>
                      <div>
                        <MDBBtn onClick={toggleModal}>Add Task</MDBBtn>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </div>
              <hr className="my-4" />
              <div>
                <MDBBtn
                  onClick={handleSubmit}
                  style={{ marginRight: 10 }}
                  color="warning"
                >
                  Assigned To ME
                </MDBBtn>

                <MDBBtn onClick={getAllTaskAssignedByME} color="dark">
                  Assign By ME
                </MDBBtn>
              </div>

              <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
                <p className="small mb-0 me-2 text-muted">Filter</p>
                <Select
                  value={selectedStatusOption}
                  onChange={(option) => setSelectedStatusOption(option)}
                  options={statusOptions}
                />
                <p className="small mb-0 ms-4 me-2 text-muted">Sort</p>
                <Select
                  value={selectedDateOption}
                  onChange={(option) => setSelectedDateOption(option)}
                  options={dateOptions}
                />
                <MDBTooltip
                  tag="a"
                  wrapperProps={{ href: "#!" }}
                  title="Ascending"
                >
                  <MDBIcon
                    fas
                    icon="sort-amount-down-alt"
                    className="ms-2"
                    style={{ color: "#23af89" }}
                  />
                </MDBTooltip>
              </div>

              {response.map((task) => (
                <MDBListGroup
                  key={task.id}
                  horizontal
                  className="rounded-0 bg-transparent"
                >
                  <MDBListGroupItem className="d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                    {task.TaskStatus === "Pending" ? (
                      optComplete ? (
                        <MDBBtn
                          color="success"
                          onClick={() => completetask(task)}
                        >
                          Complete
                        </MDBBtn>
                      ) : null
                    ) : (
                      <MDBBtn style={{ opacity: 0, cursor: "none" }}>
                        "Abhishek"
                      </MDBBtn>
                    )}
                  </MDBListGroupItem>
                  <MDBListGroupItem className="px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                    <MDBTooltip
                      tag="a"
                      wrapperProps={{ href: "#!" }}
                      title="Task Name"
                    >
                      <p className="lead fw-normal mb-0">{task.TaskName}</p>
                    </MDBTooltip>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="px-1 py-0.5 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                    <MDBTooltip
                      tag="a"
                      wrapperProps={{ href: "#!" }}
                      title="Assigned By"
                    >
                      <p className="lead fw-normal mb-1">
                        {task.AssignedBy.FirstName} {task.AssignedBy.LastName}
                      </p>
                    </MDBTooltip>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="px-3 py-1 d-flex align-items-center border-0 bg-transparent">
                    <div className="py-2 px-3 me-2 border border-danger rounded-3 d-flex align-items-center bg-light">
                      <p className="small mb-0">
                        <MDBTooltip
                          tag="a"
                          wrapperProps={{ href: "#!" }}
                          title="Deadline date"
                        >
                          <MDBIcon
                            fas
                            icon="hourglass-half"
                            color="danger"
                            className="me-2"
                          />
                        </MDBTooltip>
                        {moment(task.Deadline).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </p>
                    </div>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                    <div className="d-flex flex-row justify-content-end mb-1">
                      <div className="me-3">
                        <MDBListGroupItem className="px-3 py-1 d-flex align-items-center border-0 bg-transparent">
                          <div
                            className={`py-1 px-2 me-1 border ${
                              task.TaskStatus === "Completed"
                                ? "border-success"
                                : task.TaskStatus === "Expired"
                                ? "border-danger"
                                : "border-warning"
                            } rounded-3 d-flex align-items-center bg-light`}
                          >
                            <p className="small mb-0">{task.TaskStatus}</p>
                          </div>
                        </MDBListGroupItem>
                      </div>
                      <MDBTooltip
                        tag="a"
                        wrapperProps={{ href: "#!" }}
                        title="Edit todo"
                      >
                        <MDBIcon
                          fas
                          icon="pencil-alt"
                          className="me-3"
                          color="info"
                        />
                      </MDBTooltip>
                      <MDBTooltip
                        tag="a"
                        wrapperProps={{ href: "#!" }}
                        title="Delete todo"
                      >
                        <MDBIcon fas icon="trash-alt" color="danger" />
                      </MDBTooltip>
                    </div>
                    <div className="text-end text-muted">
                      <MDBTooltip
                        tag="a"
                        wrapperProps={{ href: "#!" }}
                        title="Assigned Date"
                      >
                        <p className="small text-muted mb-0">
                          <MDBIcon fas icon="info-circle" className="me-2" />
                          {moment(task.AssignedAt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </p>
                      </MDBTooltip>
                    </div>
                  </MDBListGroupItem>
                </MDBListGroup>
              ))}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Dashboard;
