import React, { useEffect, useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableSortLabel from "@mui/material/TableSortLabel";
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
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof FoodReview>("name");
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
    if (restaurantToEdit) {
      setEditedFoodReview(restaurantToEdit);
    }
  };

  // GUARDAR
  const handleSave = () => {
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

  const handleDelete = (id: number) => {
    fetch(`http://localhost:8000/api/food_reviews/${id}/`, {
      method: "DELETE",
    })
      .then(() => {
        setFoodReviews(foodReviews.filter((review) => review.id !== id));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // ORDENAMIENTO
  const handleSort = (property: keyof FoodReview) => {
    const isASC = orderBy === property && order === "asc";
    setOrder(isASC ? "desc" : "asc");
    setOrderBy(property);
  };

  function comparator<FoodReview>(
    a: FoodReview,
    b: FoodReview,
    orderBy: keyof FoodReview
  ) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const sorterArray = (array: FoodReview[], order: "asc" | "desc") => {
    const copy = [...array];
    const sorted = copy.sort((a, b) => {
      return order === "desc"
        ? comparator(a, b, orderBy)
        : -comparator(a, b, orderBy);
    });
    return sorted;
  };

  const visibleRows = useMemo(
    () => sorterArray(foodReviews, order),
    [order, orderBy, foodReviews]
  );

  // PARA REFACTOR:
  const labels = [
    { name: "name", label: "Nombre local" },
    { name: "location", label: "Ubicación" },
    { name: "country", label: "País" },
    { name: "type", label: "Tipo de comida" },
    { name: "rank", label: "Calificación" },
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {labels.map(({ name, label }) => (
              <TableCell align="right" key={name}>
                <TableSortLabel
                  active={orderBy === name}
                  direction={orderBy === name ? order : "asc"}
                  onClick={() => handleSort(name as keyof FoodReview)}
                >
                  {label}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell align="right">Visitado</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {visibleRows.map((restaurant, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {labels.map(({ name }) => (
                <TableCell align="right" key={name}>
                  {editedFoodReview.id === restaurant.id ? (
                    <TextField
                      value={editedFoodReview[name as keyof FoodReview]}
                      onChange={(event) =>
                        setEditedFoodReview({
                          ...editedFoodReview,
                          [name]:
                            name === "type" || name === "rank"
                              ? parseInt(event.target.value, 10) || 0
                              : event.target.value,
                        })
                      }
                    />
                  ) : (
                    restaurant[name as keyof FoodReview]
                  )}
                </TableCell>
              ))}

              <TableCell align="right">
                {/* EDIT */}
                <Button onClick={() => handleEditId(restaurant.id)}>
                  <EditIcon />
                </Button>
                {editedFoodReview.id === restaurant.id && (
                  <Button onClick={handleSave}>
                    <SaveIcon />
                  </Button>
                )}

                {/* DELETE */}
                <Button onClick={() => handleDelete(restaurant.id)}>
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
