import { useMutation } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isChecking, mutate: isCheckIn } = useMutation({
    mutationFn: ({ bookingId, breakFast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakFast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      navigate("/dashboard");
    },
    onError: (err) => toast.error(err.message),
  });
  return { isChecking, isCheckIn };
}
