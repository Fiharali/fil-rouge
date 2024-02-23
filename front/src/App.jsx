/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch('http://127.0.0.1:8000/api/user')
  //     .then(response => response.json())
  //     .then((result) => {
  //       setData(result);
  //       console.log(result);
  //     })
  //     .catch(error => console.error('Error fetching data:', error));
  // }, []); // empty dependency array means this effect runs only once after the component mounts

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
