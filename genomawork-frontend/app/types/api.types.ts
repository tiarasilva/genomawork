export interface FoodReview {
  id: number;
  name: string;
  location: string;
  typeFood: string;
  rank: number | null;
  country: string;
  visited: boolean;
}
