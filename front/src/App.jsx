/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import UserContext from "./context/UserContext";

function App() {


  return (
    <>
      <UserContext>
        <RouterProvider router={router} />
      </UserContext>
    </>
  );
}

export default App;
