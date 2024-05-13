import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Drawer,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { FoodReview } from "@/types/api.types";
import CheckIcon from "@mui/icons-material/Check";

export default function NewReviewDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [showAlert, setShowAlert] = useState(false);
  const [formNewFoodReview, setFormNewFoodReview] = useState<FoodReview>({
    id: 0,
    name: "",
    location: "",
    typeFood: "",
    rank: 0,
    visited: false,
    country: "",
  });

  const labels = [
    { name: "name", label: "Nombre local", type: "text" },
    { name: "location", label: "Ubicación", type: "text" },
    { name: "country", label: "País", type: "text" },
    { name: "rank", label: "Calificación", type: "number" },
    { name: "typeFood", label: "Tipo de comida", type: "text" },
  ];

  const handleCreate = () => {
    console.log(formNewFoodReview, typeof formNewFoodReview.typeFood);
    fetch("http://localhost:8000/api/food_reviews/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formNewFoodReview),
    })
      .then((response) => {
        if (response.ok) {
          setShowAlert(true);
          setFormNewFoodReview({
            id: 0,
            name: "",
            location: "",
            typeFood: "",
            rank: 0,
            visited: false,
            country: "",
          });
        }
        return response.json();
      })
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error("Error al crear nuevo local:", error);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormNewFoodReview({
      ...formNewFoodReview,
      [event.target.name]: event.target.value,
    });
  };

  const checkCompletenessTextfields = () => {
    const { name, location, typeFood, country } = formNewFoodReview;
    if (name && location && typeFood && country) {
      return false;
    }
    return true;
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      PaperProps={{ style: { width: "40%", minWidth: "100px" } }}
    >
      {showAlert && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Se creó exitosamente el nuevo local
        </Alert>
      )}

      <Box sx={{ margin: 7 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: 2 }}>
          Nuevo local
        </Typography>
        {labels.map(({ name, label, type }, index) => (
          <Box
            key={index}
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <Typography variant="h6">{label}</Typography>
            <TextField
              id="outlined-basic"
              label={label}
              variant="outlined"
              name={name}
              value={formNewFoodReview[name as keyof FoodReview]}
              onChange={handleChange}
            />
          </Box>
        ))}

        <Box key="Visitado" sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6">Visitado</Typography>
          <Checkbox onChange={handleChange} value={true} name="visited" />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            onClick={handleCreate}
            disabled={checkCompletenessTextfields()}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
