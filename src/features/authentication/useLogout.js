import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: logoutLoading, mutate: logoutMutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("hope to see you again");
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: (err) => toast.error(`Error on ${err.message}`),
  });
  return { logoutLoading, logoutMutate };
}
