import styled from "styled-components";
import useRecentBooking from "./useRecentBooking";
import useRecentStays from "./useRecentStays";
import Spinner from "./../../ui/Spinner";
import Stats from "./Stats";
import useCabin from "../cabins/useCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { isLoading, bookings, error } = useRecentBooking();
  const { stayLoading, stays, confirmStays, numDays } = useRecentStays();
  const { isLoading: cabinLoading, cabins } = useCabin();
  if (isLoading || stayLoading || cabinLoading) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />

      <DurationChart confirmStays={confirmStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
