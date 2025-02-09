import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

export interface Review {
  id: string;
  reviewer_id: string;
  seller_id: string;
  rating: number;
  comment: string;
  created_at: string;
  reviewer?: {
    full_name: string;
    avatar_url: string;
  };
}

export function useVehicleReviews(sellerId?: string) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (!sellerId) return;

    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from("reviews")
          .select(
            `
            *,
            reviewer:profiles!reviewer_id(full_name, avatar_url)
          `,
          )
          .eq("seller_id", sellerId)
          .order("created_at", { ascending: false });

        if (error) throw error;

        setReviews(data || []);

        // Calculate average rating
        if (data && data.length > 0) {
          const avg =
            data.reduce((acc, review) => acc + (review.rating || 0), 0) /
            data.length;
          setAverageRating(Math.round(avg * 10) / 10);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();

    // Set up realtime subscription
    const subscription = supabase
      .channel("reviews_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "reviews",
          filter: `seller_id=eq.${sellerId}`,
        },
        () => fetchReviews(),
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [sellerId]);

  const addReview = async (rating: number, comment: string) => {
    if (!user || !sellerId) return;

    try {
      const { error } = await supabase.from("reviews").insert([
        {
          reviewer_id: user.id,
          seller_id: sellerId,
          rating,
          comment,
        },
      ]);

      if (error) throw error;
    } catch (err) {
      console.error("Error adding review:", err);
      throw err;
    }
  };

  const updateReview = async (
    reviewId: string,
    rating: number,
    comment: string,
  ) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("reviews")
        .update({ rating, comment })
        .eq("id", reviewId)
        .eq("reviewer_id", user.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updating review:", err);
      throw err;
    }
  };

  const deleteReview = async (reviewId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", reviewId)
        .eq("reviewer_id", user.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error deleting review:", err);
      throw err;
    }
  };

  return {
    reviews,
    loading,
    averageRating,
    addReview,
    updateReview,
    deleteReview,
  };
}
