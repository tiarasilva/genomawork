"use client";
import React, { useEffect, useState } from "react";
import ReviewsTable from "./lib/table";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import NewReviewDrawer from "./lib/newReviewDrawer";
import { FoodReview } from "./types/api.types";
import SearchIcon from "@mui/icons-material/Search";

import { API_URL } from "../constants";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [foodReviews, setFoodReviews] = useState<FoodReview[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const foodTypesSet = new Set<string>(
    foodReviews.map((review) => review.typeFood)
  );
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  useEffect(() => {
    if (searchValue === "") {
      fetch(`${API_URL}/food_reviews/`)
        .then((res) => res.json())
        .then((data) => {
          setFoodReviews(data.results);
          setIsLoading(false);
        });
    } else {
      fetch(`${API_URL}/food_reviews/?search=${searchValue}`)
        .then((res) => res.json())
        .then((data) => {
          setFoodReviews(data.results);
          setIsLoading(false);
        });
    }
  }, [foodReviews]);

  useEffect(() => {
    if (!isInitialized && foodReviews.length > 0) {
      const foodTypesSet = new Set<string>(
        foodReviews.map((review) => review.typeFood)
      );
      setSelectedType(Array.from(foodTypesSet));
      setIsInitialized(true);
    }
  }, [foodReviews, isInitialized]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Box sx={{ width: "85%", margin: 20 }}>
          <Skeleton variant="rectangular" height={300} />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      component="main"
      sx={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <Box sx={{ width: "85%", margin: 20 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            alignItems: "center",
          }}
        >
          <FormControl sx={{ m: 1, width: "40%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Buscar
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              label="Buscar..."
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: 300 }} variant="outlined">
            <InputLabel id="demo-simple-select-label">
              Tipo de comida
            </InputLabel>
            <Select
              label="Tipo de comida"
              multiple
              value={selectedType}
              onChange={(event) => {
                setSelectedType(event.target.value as string[]);
              }}
              input={<OutlinedInput label="Tipo de comida" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {Array.from(foodTypesSet).map((typeFood: string) => (
                <MenuItem key={typeFood} value={typeFood}>
                  <Checkbox checked={selectedType.indexOf(typeFood) > -1} />
                  <ListItemText primary={typeFood} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            sx={{ height: 56 }}
            onClick={toggleDrawer(true)}
          >
            Nuevo local
          </Button>
        </Box>

        <ReviewsTable
          foodReviews={foodReviews.filter((review) =>
            selectedType.includes(review.typeFood)
          )}
          setFoodReviews={setFoodReviews}
        />
      </Box>
      <NewReviewDrawer open={openDrawer} onClose={toggleDrawer(false)} />
    </Box>
  );
}
