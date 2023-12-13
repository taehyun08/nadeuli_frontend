import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Button } from "@mui/material";

function AddTradeReview() {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      disableElevation
      style={{ backgroundColor: "yourColor", color: "yourTextColor" }}
    >
      Disable elevation
    </Button>
  );
}

export default AddTradeReview;