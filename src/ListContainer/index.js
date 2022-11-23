import { Pagination, Paper, Table } from "@mantine/core";
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
  const [users, setUser] = useState([]);
  useEffect(() => {
    fetchData(setUser);
  }, []);
  console.log(users)

  const rows = users.map((user)=>(
    <tr key={user.id}>
        <td>{user.first_name} {user.last_name}</td>
        <td>{user.subscription.status}</td>
        <td>{user.gender}</td>
        <td>{user.credit_card.cc_number}</td>
        <td>{user.address.city}</td>
    </tr>
  ));

  const [numUsers, setNumusers] = useState(1);
  useEffect(()=>{setNumusers(rows.length)},[rows]);

  const [activePage, setPage] = useState(1);
  return (
    <Paper shadow='lg' p="md" sx={{alignItems: "center"}}>
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
            {rows.slice(10*(activePage-1),10*(activePage-1)+10 )}
        </tbody>
      </Table>
      <Pagination p='lg' sx={{justifyContent: 'center'}} total={numUsers/10} initialPage={1} page={activePage} onChange={setPage}>
        </Pagination>
    </Paper>
  );
};
