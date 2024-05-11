import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        display: "flex",
        height: 100,
        alignItems: "center",
        p: "1rem", // p-4
        flexGrow: 1,
        boxShadow: 1,
      }}
    >
      <Typography>Header Tiara Silva</Typography>
    </Box>
  );
}
