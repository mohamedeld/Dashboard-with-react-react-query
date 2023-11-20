import styled from "styled-components";

import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { Textarea } from "../../ui/Textarea";
import { useMutation } from "@tanstack/react-query";
import { createEdiCabin } from "../../services/apiCabins";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import FormRow from "./../../ui/FormRow";
// const FormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEdit = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEdit ? editValues : {},
  });
  const { errors } = formState;
  const queryClient = useQueryClient();
  const { isLoading: isSubmitting, mutate } = useMutation({
    mutationFn: createEdiCabin,
    onSuccess: () => {
      toast.success("new cabin added successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }
  function onError(errors) {
    // console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow
        label="Cabin name"
        error={errors?.name?.message}
        orientation={"horizontal"}
      >
        <Input
          type="text"
          disabled={isSubmitting}
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={errors?.maxCapacity?.message}
        orientation={"horizontal"}
      >
        <Input
          type="number"
          disabled={isSubmitting}
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "maximum capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={errors?.totoalPrice?.message}
        orientation={"horizontal"}
      >
        <Input
          type="number"
          disabled={isSubmitting}
          id="totoalPrice"
          {...register("totoalPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "maximum capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Discount"
        error={errors?.discount?.message}
        orientation={"horizontal"}
      >
        <Input
          type="number"
          id="discount"
          disabled={isSubmitting}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              return (
                value <= getValues("totoalPrice") ||
                "Discount should be less than total price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
        orientation={"horizontal"}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isSubmitting}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEdit ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isSubmitting}>
          {isEdit ? "Edit cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;