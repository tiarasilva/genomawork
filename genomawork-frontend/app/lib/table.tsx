import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FoodReview } from "@/types/api.types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ReviewsTable({
  foodReviews,
}: {
  foodReviews: FoodReview[];
}) {
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
          {foodReviews.map((restaurant, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {restaurant.name}
              </TableCell>
              <TableCell align="right">{restaurant.location}</TableCell>
              <TableCell align="right">{restaurant.type}</TableCell>
              <TableCell align="right">{restaurant.rank}</TableCell>
              <TableCell align="right">
                {restaurant.visited ? "Sí" : "No"}
              </TableCell>
              <TableCell align="right">
                <EditIcon /> <DeleteIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
