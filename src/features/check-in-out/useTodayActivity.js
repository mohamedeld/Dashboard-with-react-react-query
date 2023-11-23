import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";
export default function useTodayActivity() {
  const { isLoading: activityLoading, data: activities } = useQuery({
    queryKey: ["activity-today"],
    queryFn: getStaysTodayActivity,
  });

  return { activityLoading, activities };
}
