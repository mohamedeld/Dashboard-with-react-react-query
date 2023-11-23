import { useMutation } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
export default function useCheckout() {
  const queryClient = useQueryClient();
  const { isLoading: isCheckout, mutate: checkOutMutate } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) =>
      toast.error(`there is an error in updating check out ${err.message}`),
  });
  return { isCheckout, checkOutMutate };
}
