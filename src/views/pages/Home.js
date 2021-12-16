import React from "react";
import Button from "@mui/material/Button";

function Home() {
  const [count, setCount] = React.useState(0);

  if (count === 5) {
    throw new Error("Home throw an error");
  }

  return (
    <div>
      <h2>Home page</h2>
      <Button
        variant="contained"
        onClick={() => setCount((state) => state + 1)}
      >
        Increase
      </Button>
    </div>
  );
}

export default Home;
