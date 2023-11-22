import React from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function useLogin() {
  const navigate = useNavigate();
  const { isLoading, mutate: loginMutation } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (err) => toast.error(`Error with login ${err.message}`),
  });
  return { isLoading, loginMutation };
}
