import { useMutation } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
export default function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteMutation } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success("booking deleted successfully");
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("there is an error while deleting the booking"),
  });
  return { isDeleting, deleteMutation };
}
