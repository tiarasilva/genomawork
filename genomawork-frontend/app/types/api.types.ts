export interface FoodReview {
  id: number;
  name: string;
  location: string;
  type: number;
  rank: number | null;
  country: string;
  visited: boolean;
}
