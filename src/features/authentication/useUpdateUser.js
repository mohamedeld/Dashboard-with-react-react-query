import { useMutation } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updatedUserMutate, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("data update successfully");
      queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => {
      toast.error(`Error ${err.message}`);
      console.log(err.message);
    },
  });
  return { updatedUserMutate, isUpdating };
}
