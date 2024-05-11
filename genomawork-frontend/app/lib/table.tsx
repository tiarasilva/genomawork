import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  name: string,
  location: string,
  type: string,
  rank: number,
  visited: boolean
) {
  return { name, location, type, rank, visited };
}

const rows = [
  createData("Tiramisu", "ubicación 1", "italiana", 4, true),
  createData("Niu Sushi", "ubicación 1", "italiana", 4, true),
  createData("Borago", "ubicación 1", "italiana", 4, false),
  createData("Otro", "ubicación 1", "italiana", 4, false),
];

export default function ReviewsTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Ubicación</TableCell>
            <TableCell align="right">Tipo</TableCell>
            <TableCell align="right">Calificación</TableCell>
            <TableCell align="right">Visitado</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.location}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.rank}</TableCell>
              <TableCell align="right">{row.visited}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
