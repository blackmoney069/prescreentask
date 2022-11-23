import { ClassNames } from "@emotion/react";
import {
  Container,
  Pagination,
  Paper,
  Select,
  Table,
  TextInput,
} from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

async function fetchData(setUser) {
  try {
    const response = await axios.get(
      "https://random-data-api.com/api/users/random_user?size=30"
    );
    setUser(response.data);
  } catch (error) {
    console.log(error);
  }
}

function getRowsBefore(container, y) {
  const draggableItems = [
    ...container.querySelectorAll(".draggableRows:not(.dragging")
  ];
  return draggableItems.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if(offset<0 && offset > closest.offset){
        return {offset:offset, element:child}
      } else{
        return closest
      }
    } ,
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

export const ListContainer = () => {
  const [numUsers, setNumusers] = useState(1);
  const [activePage, setPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [users, setUser] = useState([]);
  const [namefilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [gender, setGender] = useState("");
  const [subFilter, setSubFilter] = useState("");
  useEffect(() => {
    fetchData(setUser);
  }, []);
  const [rows, updateRows] = useState([]);

  useEffect(() => {
    let list = [];
    users.map((user) => {
      if (
        user.first_name.includes(namefilter) &&
        user.email.includes(emailFilter) &&
        user.gender.includes(gender) &&
        user.subscription.status.includes(subFilter)
      ) {
        list.push(
          <tr draggable="true" key={user.id} className="draggableRows" >
            <td>
              {user.first_name} {user.last_name}
            </td>
            <td>{user.subscription.status}</td>
            <td>{user.gender}</td>
            <td>{user.credit_card.cc_number}</td>
            <td>{user.address.city}</td>
          </tr>
        );
      }
      return null;
    });
    updateRows(list);
    setNumusers(list.length);
  }, [namefilter, emailFilter, usersPerPage, gender, subFilter, activePage, users]);

  const draggables = document.querySelectorAll(".draggableRows");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });

  const container = document.querySelectorAll(".listTable");
  container.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterRow = getRowsBefore(container, e.clientY);
      const draggable = document.querySelector('.dragging')
    //   console.log(typeof(draggable))
    //   console.log(typeof(afterRow))
      if(afterRow==null){
        container.appendChild(draggable)
      } else{
        container.insertBefore(draggable, afterRow)
      }
    });
  });

  return (
    <Paper shadow="lg" p="md" sx={{ alignItems: "center"}}>
      <Container
        sx={{
          display: "flex",
          flexDirection:"row",
          flexFlow: "row wrap",//{md:"column",lg:"row"},
          justifyContent: "space-around",
          maxWidth: "100%",
        }}
      >
        <TextInput
          label="Username"
          size="xs"
          placeholder="Search..."
          value={namefilter}
          onChange={(event) => {
            setNameFilter(event.currentTarget.value);
          }}
        ></TextInput>
        <TextInput
          label="Email"
          size="xs"
          placeholder="Search..."
          value={emailFilter}
          onChange={(event) => {
            setEmailFilter(event.currentTarget.value);
          }}
        ></TextInput>
        <TextInput
          label="Count"
          size="xs"
          value={usersPerPage}
          onChange={(event) => setUsersPerPage(event.currentTarget.value)}
        ></TextInput>
        <Select
        size="xs"
          label="Gender"
          placeholder="pickone"
          value={gender}
          onChange={setGender}
          data={[
            { value: "", label: "All" },
            { value: "Genderqueer", label: "Genderqueer" },
            { value: "Bigender", label: "Bigender" },
            { value: "Genderfluid", label: "Genderfluid" },
            { value: "Female", label: "Female" },
            { value: "Male", label: "Male" },
            { value: "Polygender", label: "Polygender" },
            { value: "Non-binary", label: "Non-binary" },
            { value: "Agender", label: "Agender" },
          ]}
        ></Select>
        <Select
        size="xs"
          label="Subscription"
          placeholder="pickone"
          value={subFilter}
          onChange={setSubFilter}
          data={[
            { value: "", label: "All" },
            { value: "Pending", label: "Pending" },
            { value: "Idle", label: "Idle" },
            { value: "Blocked", label: "Blocked" },
            { value: "Active", label: "Active" },
          ]}
        ></Select>
      </Container>
      <Container sx={{overflow: 'auto'}}>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Gender</th>
            <th>Credit Card Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody className="listTable">
          {rows.slice(
            usersPerPage * (activePage - 1),
            usersPerPage * activePage
          )}
        </tbody>
      </Table>
      </Container>
      <Pagination
        p="lg"
        sx={{ justifyContent: "center" }}
        total={Math.ceil(numUsers / usersPerPage)}
        initialPage={1}
        page={activePage}
        onChange={setPage}
      ></Pagination>
    </Paper>
  );
};
