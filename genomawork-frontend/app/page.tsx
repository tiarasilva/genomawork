import * as React from "react";
import ReviewsTable from "./lib/table";
import Box from "@mui/material/Box";
import Header from "./header";

export default function Home() {
  return (
    <Box
      component="main"
      sx={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <Box sx={{ width: "85%", margin: 20 }}>
        <ReviewsTable />
      </Box>
    </Box>
  );
}
