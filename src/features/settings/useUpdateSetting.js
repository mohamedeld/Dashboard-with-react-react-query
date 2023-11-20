import { useMutation } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
export default function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: editSetting } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("update settings successfully");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdating, editSetting };
}
