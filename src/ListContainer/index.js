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

export const ListContainer = () => {
  const [numUsers, setNumusers] = useState(1);
  const [activePage, setPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [users, setUser] = useState([]);
  useEffect(() => {
    fetchData(setUser);
  }, []);

  const rows = users.map((user) => (
    <tr key={user.id}>
      <td>
        {user.first_name} {user.last_name}
      </td>
      <td>{user.subscription.status}</td>
      <td>{user.gender}</td>
      <td>{user.credit_card.cc_number}</td>
      <td>{user.address.city}</td>
    </tr>
  ));
  useEffect(() => {
    setNumusers(rows.length);
  }, [rows]);

  return (
    <Paper shadow="lg" p="md" sx={{ alignItems: "center" }}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-around",
          maxWidth: "100%",
        }}
      >
        <TextInput
          label="Search with username"
          size="xs"
          placeholder="Search..."
        ></TextInput>
        <TextInput
          label="Search with EMAIL"
          size="xs"
          placeholder="Search..."
        ></TextInput>
        <TextInput label="Count" size="xs" value={usersPerPage} onChange={(event) => setUsersPerPage(event.currentTarget.value)}></TextInput>
        <Select
          label="Gender"
          placeholder="pickone"
          data={[
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
          label="Subscription"
          placeholder="pickone"
          data={[
            { value: "Pending", label: "Pending" },
            { value: "Idle", label: "Idle" },
            { value: "Blocked", label: "Blocked" },
            { value: "Active", label: "Active" }
          ]}
        ></Select>
      </Container>
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
        <tbody>
          {rows.slice(
            usersPerPage * (activePage - 1),
            usersPerPage * (activePage - 1) + usersPerPage
          )}
        </tbody>
      </Table>
      <Pagination
        p="lg"
        sx={{ justifyContent: "center" }}
        total={numUsers / 10}
        initialPage={1}
        page={activePage}
        onChange={setPage}
      ></Pagination>
    </Paper>
  );
};
