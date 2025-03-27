import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../Pages/HomePage";
import { CreateTaskPage } from "../Pages/CreateTaskPage";

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route>
          <Route index element={<HomePage />} />
          <Route path="/create-task" element={<CreateTaskPage />} />
        </Route>
      </Routes>
    </>
  );
};
