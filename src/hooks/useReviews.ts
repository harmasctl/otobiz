import { useState, useEffect } from "react";
import { Review } from "@/types/database";
import { reviewsApi } from "@/lib/api/reviews";

export function useReviews(sellerId: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await reviewsApi.list(sellerId);
        setReviews(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [sellerId]);

  const addReview = async (
    review: Omit<Review, "id" | "created_at" | "reviewer">,
  ) => {
    try {
      const added = await reviewsApi.create(review);
      setReviews((prev) => [added, ...prev]);
      return added;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updateReview = async (
    id: string,
    updates: Pick<Review, "rating" | "comment">,
  ) => {
    try {
      const updated = await reviewsApi.update(id, updates);
      setReviews((prev) =>
        prev.map((r) => (r.id === updated.id ? updated : r)),
      );
      return updated;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteReview = async (id: string) => {
    try {
      await reviewsApi.delete(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    reviews,
    loading,
    error,
    addReview,
    updateReview,
    deleteReview,
    averageRating: reviews.length
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0,
  };
}
