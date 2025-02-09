-- Create function to get admin stats
CREATE OR REPLACE FUNCTION get_admin_stats()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'totalUsers', (SELECT COUNT(*) FROM profiles),
    'activeUsers', (SELECT COUNT(*) FROM profiles WHERE last_seen > NOW() - INTERVAL '30 days'),
    'totalDealers', (SELECT COUNT(*) FROM profiles WHERE role = 'dealer'),
    'verifiedDealers', (SELECT COUNT(*) FROM profiles WHERE role = 'dealer' AND is_verified = true),
    'totalVehicles', (SELECT COUNT(*) FROM vehicles),
    'activeListings', (SELECT COUNT(*) FROM vehicles WHERE status = 'active'),
    'pendingListings', (SELECT COUNT(*) FROM vehicles WHERE status = 'pending'),
    'featuredListings', (SELECT COUNT(*) FROM vehicles WHERE is_featured = true),
    'totalFavorites', (SELECT COUNT(*) FROM favorites),
    'totalReviews', (SELECT COUNT(*) FROM reviews),
    'averageRating', (SELECT COALESCE(AVG(rating), 0) FROM reviews)
  ) INTO result;

  RETURN result;
END;
$$;

-- Create function to get revenue stats
CREATE OR REPLACE FUNCTION get_revenue_stats(period_param text)
RETURNS json[]
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  interval_value interval;
  result json[];
BEGIN
  interval_value := CASE period_param
    WHEN 'day' THEN INTERVAL '1 day'
    WHEN 'week' THEN INTERVAL '7 days'
    WHEN 'month' THEN INTERVAL '30 days'
    WHEN 'year' THEN INTERVAL '365 days'
    ELSE INTERVAL '7 days'
  END;

  WITH dates AS (
    SELECT generate_series(
      date_trunc('day', NOW() - interval_value),
      date_trunc('day', NOW()),
      '1 day'::interval
    ) AS date
  )
  SELECT array_agg(
    json_build_object(
      'date', dates.date,
      'value', COALESCE(SUM(CASE WHEN v.is_featured THEN v.price * 0.1 ELSE v.price * 0.05 END), 0)
    )
  )
  INTO result
  FROM dates
  LEFT JOIN vehicles v ON date_trunc('day', v.created_at) = dates.date
  GROUP BY dates.date
  ORDER BY dates.date;

  RETURN result;
END;
$$;

-- Create function to get user stats
CREATE OR REPLACE FUNCTION get_user_stats(period_param text)
RETURNS json[]
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  interval_value interval;
  result json[];
BEGIN
  interval_value := CASE period_param
    WHEN 'day' THEN INTERVAL '1 day'
    WHEN 'week' THEN INTERVAL '7 days'
    WHEN 'month' THEN INTERVAL '30 days'
    WHEN 'year' THEN INTERVAL '365 days'
    ELSE INTERVAL '7 days'
  END;

  WITH dates AS (
    SELECT generate_series(
      date_trunc('day', NOW() - interval_value),
      date_trunc('day', NOW()),
      '1 day'::interval
    ) AS date
  )
  SELECT array_agg(
    json_build_object(
      'date', dates.date,
      'value', COUNT(p.id)
    )
  )
  INTO result
  FROM dates
  LEFT JOIN profiles p ON date_trunc('day', p.created_at) = dates.date
  GROUP BY dates.date
  ORDER BY dates.date;

  RETURN result;
END;
$$;

-- Create function to get listing stats
CREATE OR REPLACE FUNCTION get_listing_stats(period_param text)
RETURNS json[]
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  interval_value interval;
  result json[];
BEGIN
  interval_value := CASE period_param
    WHEN 'day' THEN INTERVAL '1 day'
    WHEN 'week' THEN INTERVAL '7 days'
    WHEN 'month' THEN INTERVAL '30 days'
    WHEN 'year' THEN INTERVAL '365 days'
    ELSE INTERVAL '7 days'
  END;

  WITH dates AS (
    SELECT generate_series(
      date_trunc('day', NOW() - interval_value),
      date_trunc('day', NOW()),
      '1 day'::interval
    ) AS date
  )
  SELECT array_agg(
    json_build_object(
      'date', dates.date,
      'value', COUNT(v.id)
    )
  )
  INTO result
  FROM dates
  LEFT JOIN vehicles v ON date_trunc('day', v.created_at) = dates.date
  GROUP BY dates.date
  ORDER BY dates.date;

  RETURN result;
END;
$$;