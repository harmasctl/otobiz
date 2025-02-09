import { useState, useEffect } from "react";
import { sellersApi } from "@/lib/api/sellers";
import { useAuth } from "@/lib/auth";
import {
  SellerProfile,
  SellerAnalytics,
  SellerDocument,
} from "@/types/database";

export function useSeller(id?: string) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<SellerProfile | null>(null);
  const [analytics, setAnalytics] = useState<SellerAnalytics[]>([]);
  const [documents, setDocuments] = useState<SellerDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const sellerId = id || user?.id;

  useEffect(() => {
    if (!sellerId) {
      setLoading(false);
      return;
    }

    const loadSellerData = async () => {
      try {
        const [profileData, analyticsData, documentsData] = await Promise.all([
          sellersApi.getProfile(sellerId),
          sellersApi.getAnalytics(sellerId, "month"),
          sellersApi.getDocuments(sellerId),
        ]);

        setProfile(profileData);
        setAnalytics(analyticsData);
        setDocuments(documentsData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadSellerData();
  }, [sellerId]);

  const updateProfile = async (updates: Partial<SellerProfile>) => {
    if (!sellerId) return;

    try {
      const updated = await sellersApi.updateProfile(sellerId, updates);
      setProfile(updated);
      return updated;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const uploadDocument = async (type: string, file: File) => {
    if (!sellerId) return;

    try {
      const uploaded = await sellersApi.uploadDocument(sellerId, type, file);
      setDocuments((prev) => [uploaded, ...prev]);
      return uploaded;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const fetchAnalytics = async (period: "day" | "week" | "month" | "year") => {
    if (!sellerId) return;

    try {
      const data = await sellersApi.getAnalytics(sellerId, period);
      setAnalytics(data);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    profile,
    analytics,
    documents,
    loading,
    error,
    updateProfile,
    uploadDocument,
    fetchAnalytics,
  };
}
