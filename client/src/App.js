import {useEffect, useState} from "react";
const API_URL = process.env.REACT_APP_API;

function App() {
  // const [data, setData] = useState("No data :(");
  const [res, setRes] = useState("No Reservation :(");

  async function getRes(event) {
    event.preventDefault();

    const url = `${API_URL}/res`;
    const confNumber = event.target.confirmation.value;
    const firstName = event.target.first.value;
    const lastName = event.target.last.value;
    const body = JSON.stringify({confNumber, firstName, lastName});

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    });

    const res = await response.json();
    setRes(res.msg);
  }
  
  // useEffect(() => {
  //   async function getData() {
  //     const url = `${API_URL}/hello`;
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setData(data.msg);
  //   }
  //   getData();

  // }, []); 


  return (
    <>
      <h1>Automatic Check In</h1>
      <form onSubmit={getRes}>
        <label>
          Confirmation:
          <input type="text" id="conf" name="confirmation" placeholder="Confirmation #"></input>
        </label>
        <label>
          First Name:
          <input type="text" id="first" name="first" placeholder="Last Name"></input>
        </label>
        <label>
          Last Name:
          <input type="text" id="last" name="last" placeholder="First Name"></input>
        </label>
        <input  type="submit" name="red" value ="Submit" ></input>
      </form>
      {/* <p>Data from server: {data}</p> */}
      <p>Reservation: {res}</p>
    </>
  );
}

export default App;
