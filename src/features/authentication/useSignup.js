import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
export default function useSignup() {
  const queryClient = useQueryClient();
  const { isLoading: signUpLoading, mutate: signupMutate } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("user created successfully");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => toast.error(error.message),
  });
  return { signUpLoading, signupMutate };
}
