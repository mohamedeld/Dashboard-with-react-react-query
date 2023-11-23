import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
export default function useRecentBooking() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();
  const {
    isLoading: stayLoading,
    data: stays,
    error,
  } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });
  const confirmStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { stayLoading, stays, confirmStays, numDays };
}
