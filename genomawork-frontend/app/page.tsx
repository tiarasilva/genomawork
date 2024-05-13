"use client";
import React, { useEffect, useState } from "react";
import ReviewsTable from "./lib/table";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import NewReviewDrawer from "./lib/newReviewDrawer";
import { FoodReview } from "./types/api.types";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [foodReviews, setFoodReviews] = useState<FoodReview[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const foodTypesSet = new Set<string>(
    foodReviews.map((review) => review.typeFood)
  );
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/food_reviews/")
      .then((res) => res.json())
      .then((data) => {
        setFoodReviews(data.results);
        setIsLoading(false);
      });
  }, [foodReviews]);

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
          }}
        >
          <Select
            multiple
            value={selectedType}
            onChange={(event) => {
              setSelectedType(event.target.value as string[]);
            }}
            sx={{ marginBottom: 2, marginRight: 2, width: 300 }}
            renderValue={(selected) => selected.join(", ")}
          >
            {Array.from(foodTypesSet).map((typeFood: string) => (
              <MenuItem key={typeFood} value={typeFood}>
                <Checkbox checked={selectedType.indexOf(typeFood) > -1} />
                <ListItemText primary={typeFood} />
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            sx={{ marginBottom: 2 }}
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
