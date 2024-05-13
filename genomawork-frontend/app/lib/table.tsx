import React, { useState } from "react";
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
import SaveIcon from "@mui/icons-material/Save";
import { Button, Checkbox, TextField } from "@mui/material";

export default function ReviewsTable({
  foodReviews,
  setFoodReviews,
}: {
  foodReviews: FoodReview[];
  setFoodReviews: React.Dispatch<React.SetStateAction<FoodReview[]>>;
}) {
  const [editing, setEditing] = useState(false);
  const [editedFoodReview, setEditedFoodReview] = useState<FoodReview>({
    id: 0, // No existe el restaurant con id 0
    name: "",
    location: "",
    type: 0,
    rank: null,
    visited: false,
    country: "",
  });

  const handleEditId = (id: number) => {
    const restaurantToEdit = foodReviews.find(
      (restaurant) => restaurant.id === id
    );
    console.log("restaurantToEdit: ", restaurantToEdit);
    if (restaurantToEdit) {
      setEditedFoodReview(restaurantToEdit);
    }

    console.log("editedFoodReview", editedFoodReview);
  };

  const handleSave = () => {
    console.log("ANTES DE GUARDAReditedFoodReview", editedFoodReview);
    fetch(`http://localhost:8000/api/food_reviews/${editedFoodReview.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedFoodReview),
    })
      .then((response) => response.json())
      .then(() => {
        setFoodReviews(
          foodReviews.map((review) =>
            review.id === editedFoodReview.id ? editedFoodReview : review
          )
        );
        setEditedFoodReview({
          id: 0,
          name: "",
          location: "",
          type: 0,
          rank: 0,
          visited: false,
          country: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // const labels = [
  //   { name: "name", label: "Nombre local", type: "text" },
  //   { name: "location", label: "Ubicación", type: "text" },
  //   { name: "country", label: "País", type: "text" },
  //   { name: "rank", label: "Calificación", type: "number" },
  // ];

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
                {editedFoodReview.id === restaurant.id ? (
                  <TextField
                    value={editedFoodReview.name}
                    onChange={(event) =>
                      setEditedFoodReview({
                        ...editedFoodReview,
                        name: event.target.value,
                      })
                    }
                  />
                ) : (
                  restaurant.name
                )}
              </TableCell>
              <TableCell align="right">
                {editedFoodReview.id === restaurant.id ? (
                  <TextField
                    value={editedFoodReview.location}
                    onChange={(event) =>
                      setEditedFoodReview({
                        ...editedFoodReview,
                        location: event.target.value,
                      })
                    }
                  />
                ) : (
                  restaurant.location
                )}
              </TableCell>
              <TableCell align="right">
                {editedFoodReview.id === restaurant.id ? (
                  <TextField
                    value={editedFoodReview.type}
                    onChange={(event) =>
                      setEditedFoodReview({
                        ...editedFoodReview,
                        type: parseInt(event.target.value, 10) || 1,
                      })
                    }
                  />
                ) : (
                  restaurant.type
                )}
              </TableCell>
              <TableCell align="right">
                {editedFoodReview.id === restaurant.id ? (
                  <TextField
                    value={editedFoodReview.rank}
                    onChange={(event) =>
                      setEditedFoodReview({
                        ...editedFoodReview,
                        rank: parseInt(event.target.value, 10) || null,
                      })
                    }
                  />
                ) : (
                  restaurant.rank
                )}
              </TableCell>
              <TableCell align="right">
                {editedFoodReview.id === restaurant.id ? (
                  <Checkbox
                    checked={editedFoodReview.visited}
                    onChange={(event) =>
                      setEditedFoodReview({
                        ...editedFoodReview,
                        visited: event.target.checked,
                      })
                    }
                  />
                ) : (
                  <Checkbox checked={restaurant.visited ? true : false} />
                )}
              </TableCell>

              <TableCell align="right">
                <Button onClick={() => handleEditId(restaurant.id)}>
                  <EditIcon />
                </Button>
                {editedFoodReview.id === restaurant.id && (
                  <Button onClick={handleSave}>
                    <SaveIcon />
                  </Button>
                )}
                <Button>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
