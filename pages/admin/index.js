"use client";
import React, { useState } from "react";
import Navbar from "../../Components/Navbar.jsx";
import AddCenter from "@/Components/AddCenter.jsx";
import RemoveCenter from "@/Components/RemoveCenter.jsx";
import Dosage from "@/Components/Dosage.jsx";

const Index = () => {
  const [activeOption, setActiveOption] = useState("Add Center");
//   console.log(activeOption);


  return (
    <div>
      <Navbar activeOption={activeOption} setActiveOption={setActiveOption} />
      {activeOption === "Add Center" ? (
        <AddCenter />
      ) : activeOption === "Remove Center" ? (
        <RemoveCenter />
      ) : (
        <Dosage />
      )}
    </div>
  );
};

export default Index;
