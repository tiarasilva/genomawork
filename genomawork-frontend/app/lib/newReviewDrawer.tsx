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
  const [typeRestaurants, setTypeRestaurants] = useState<any[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [formNewFoodReview, setFormNewFoodReview] = useState<FoodReview>({
    id: 0,
    name: "",
    location: "",
    type: 0,
    rank: 0,
    visited: false,
    country: "",
  });

  // Obtenemos los restaurantes disponibles:
  useEffect(() => {
    fetch("http://localhost:8000/api/type_restaurants/")
      .then((res) => res.json())
      .then((data) => {
        setTypeRestaurants(data.results);
      });
  }, []);

  const labels = [
    { name: "name", label: "Nombre local", type: "text" },
    { name: "location", label: "Ubicación", type: "text" },
    { name: "country", label: "País", type: "text" },
    { name: "rank", label: "Calificación", type: "number" },
  ];

  const handleCreate = () => {
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
        }
        return response.json();
      })
      .then(() => {
        onClose();
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormNewFoodReview({
      ...formNewFoodReview,
      [event.target.name]: event.target.value,
    });
  };

  const checkCompletenessTextfields = () => {
    const { name, location, type, country } = formNewFoodReview;
    if (name && location && type && country) {
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
        <Box
          key="type"
          sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
        >
          <Typography variant="h6">Tipo de local</Typography>
          <TextField
            id="outlined-select-currency"
            select
            label="Tipo"
            helperText="Por favor selecciona una opción"
            onChange={handleChange}
            value={formNewFoodReview.type}
            name="type"
          >
            {typeRestaurants.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>

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
