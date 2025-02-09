-- Function to get admin dashboard stats
CREATE OR REPLACE FUNCTION get_admin_stats()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'totalUsers', (SELECT COUNT(*) FROM profiles),
    'activeUsers', (SELECT COUNT(*) FROM profiles WHERE last_sign_in_at > NOW() - INTERVAL '30 days'),
    'totalDealers', (SELECT COUNT(*) FROM profiles WHERE role = 'dealer'),
    'verifiedDealers', (SELECT COUNT(*) FROM profiles WHERE role = 'dealer' AND is_verified = true),
    'totalVehicles', (SELECT COUNT(*) FROM vehicles),
    'activeListings', (SELECT COUNT(*) FROM vehicles WHERE status = 'active'),
    'pendingListings', (SELECT COUNT(*) FROM vehicles WHERE status = 'pending'),
    'featuredListings', (SELECT COUNT(*) FROM vehicles WHERE is_featured = true),
    'totalFavorites', (SELECT COUNT(*) FROM favorites),
    'totalReviews', (SELECT COUNT(*) FROM reviews),
    'averageRating', (SELECT COALESCE(AVG(rating)::NUMERIC(10,2), 0) FROM reviews)
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get analytics data
CREATE OR REPLACE FUNCTION get_analytics(period TEXT)
RETURNS JSON AS $$
DECLARE
  result JSON;
  interval_str TEXT;
BEGIN
  -- Set the interval based on the period
  interval_str := CASE period
    WHEN 'day' THEN '1 day'
    WHEN 'week' THEN '1 week'
    WHEN 'month' THEN '1 month'
    WHEN 'year' THEN '1 year'
    ELSE '1 month'
  END;

  WITH time_series AS (
    SELECT generate_series(
      date_trunc(period, NOW() - (interval_str)::interval),
      date_trunc(period, NOW()),
      ('1 ' || period)::interval
    ) AS time_point
  ),
  stats AS (
    SELECT
      time_point,
      (SELECT COUNT(*) FROM profiles WHERE created_at >= time_point AND created_at < time_point + ('1 ' || period)::interval) as new_users,
      (SELECT COUNT(*) FROM vehicles WHERE created_at >= time_point AND created_at < time_point + ('1 ' || period)::interval) as new_listings,
      (SELECT COUNT(*) FROM favorites WHERE created_at >= time_point AND created_at < time_point + ('1 ' || period)::interval) as new_favorites,
      (SELECT COUNT(*) FROM reviews WHERE created_at >= time_point AND created_at < time_point + ('1 ' || period)::interval) as new_reviews
    FROM time_series
  )
  SELECT json_agg(json_build_object(
    'date', time_point,
    'newUsers', new_users,
    'newListings', new_listings,
    'newFavorites', new_favorites,
    'newReviews', new_reviews
  )) INTO result
  FROM stats;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add RLS policies for admin functions
ALTER FUNCTION get_admin_stats() SET SECURITY DEFINER;
ALTER FUNCTION get_analytics(TEXT) SET SECURITY DEFINER;

-- Create policy to allow only admins to access these functions
CREATE POLICY admin_stats_policy ON profiles
  FOR ALL
  TO authenticated
  USING (role = 'admin');

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_verified ON profiles(is_verified);
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON vehicles(status);
CREATE INDEX IF NOT EXISTS idx_vehicles_featured ON vehicles(is_featured);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
