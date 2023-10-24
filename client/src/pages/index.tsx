import { Typography, Input, Button, message } from "antd";
import { url } from "inspector";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [prodID, setProdID] = useState("");
  const [prodName, setProdName] = useState("");

  const handleClick = async () => {
    console.log("hit");
    try {
      const data = await fetch(`http://localhost:5000/products/${prodID}`);
      const json = await data.json();
      if (data.status === 200) {
        setProdName(json);
      } else if (data.status === 404) {
        setProdName(json);
      } else {
        setProdName(json);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProdID(event.target.value);
  };

  return (
    <div
      style={{
        minHeight: "98vh",
        backgroundImage: `url(./backgroundfinal.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      }}
    >
      <Typography.Title style={{ color: "grey" }}>
        Search Product Database
      </Typography.Title>
      <span
        style={{
          alignContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
        }}
      >
        <Typography.Text
          style={{ fontSize: 40, alignContent: "center", color: "white" }}
        >
          Enter item id:{" "}
        </Typography.Text>
        <Input
          style={{
            fontSize: "12px",
            padding: "10px",
            width: "250px",
            border: "1px solid #ccc",
            borderRadius: "10px",
          }}
          type="text"
          placeholder="Enter ID Number"
          value={prodID}
          onChange={handleChange}
        />
        <Button
          style={{ border: "1px solid black", margin: "10px" }}
          onClick={handleClick}
        >
          Search
        </Button>
        <Typography.Text>{prodName}</Typography.Text>
      </span>
      <footer
        style={{
          fontFamily: "Arial",
          textAlign: "center",
          position: "absolute",
          bottom: 7,
          width: "99%",
          color: "grey",
        }}
      >
        Katherine Beaty © 2023
      </footer>
    </div>
  );
}
