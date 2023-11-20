import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEdiCabin } from "../../services/apiCabins";
export default function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isSubmitting, mutate: createCabin } = useMutation({
    mutationFn: createEdiCabin,
    onSuccess: () => {
      toast.success("new cabin added successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isSubmitting, createCabin };
}
