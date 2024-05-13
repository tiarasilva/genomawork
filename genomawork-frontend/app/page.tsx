"use client";
import React, { useEffect } from "react";
import ReviewsTable from "./lib/table";
import { Box, Button, Skeleton } from "@mui/material";
import NewReviewDrawer from "./lib/newReviewDrawer";
import { FoodReview } from "./types/api.types";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [foodReviews, setFoodReviews] = React.useState<FoodReview[]>([]);
  const [openDrawer, setOpenDrawer] = React.useState(false);

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
  }, []);

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
          <Button
            variant="contained"
            sx={{ marginBottom: 2 }}
            onClick={toggleDrawer(true)}
          >
            Nuevo local
          </Button>
        </Box>
        <ReviewsTable
          foodReviews={foodReviews}
          setFoodReviews={setFoodReviews}
        />
      </Box>
      <NewReviewDrawer open={openDrawer} onClose={toggleDrawer(false)} />
    </Box>
  );
}
