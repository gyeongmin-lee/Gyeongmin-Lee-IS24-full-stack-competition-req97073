import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  GridItem,
  Input,
  ModalBody,
  ModalFooter,
  Select,
  SimpleGrid,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { MutableRefObject } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as z from "zod";
import productService from "../../services/products";
import { Methodology, NewProductEntry } from "../../types";
import TagInput from "../_common/TagInput";

const schema = z.object({
  productName: z.string().min(1, { message: "Product name is required" }),
  productOwnerName: z.string().min(1, { message: "Product owner is required" }),
  Developers: z
    .array(z.string())
    .nonempty({ message: "At least 1 developer is required" })
    .max(5, { message: "Up to 5 developers can be assigned" }),
  scrumMasterName: z.string().min(1, { message: "Scrum master is required" }),
  startDate: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
  methodology: z.enum([Methodology.AGILE, Methodology.WATERFALL]),
});

const defaultValues: NewProductEntry = {
  productName: "",
  productOwnerName: "",
  Developers: [],
  scrumMasterName: "",
  startDate: format(new Date(), "yyyy-MM-dd"),
  methodology: Methodology.AGILE,
};

interface Props {
  onClose: () => void;
  initialFocusRef: MutableRefObject<HTMLInputElement | null>;
}

const AddProductForm = ({ onClose, initialFocusRef }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NewProductEntry>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const toast = useToast();

  const queryClient = useQueryClient();

  const { error, mutateAsync } = useMutation(productService.addProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  const commonToastProps = {
    duration: 9000,
    variant: "subtle",
    position: "top",
    isClosable: true,
  } satisfies UseToastOptions;

  const onSubmit = async (values: NewProductEntry) => {
    try {
      await mutateAsync(values);

      reset();
      onClose();
      toast({
        title: "Product added.",
        description: `We've added ${values.productName} to your dashboard.`,
        status: "success",
        ...commonToastProps,
      });
    } catch (e) {
      let errorMessage = "Unable to add product.";

      if (error instanceof AxiosError && error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast({
        title: "An error occurred.",
        description: errorMessage,
        status: "error",
        ...commonToastProps,
      });
    }
  };

  const { ref, ...rest } = register("productName");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody>
        <SimpleGrid columns={{ base: 1, md: 2 }} columnGap={3} rowGap={4}>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <FormControl isInvalid={!!errors.productName}>
              <FormLabel htmlFor="productName">Product Name</FormLabel>
              <Input
                id="productName"
                placeholder="Product Name"
                {...rest}
                ref={(e) => {
                  ref(e);
                  if (e) {
                    initialFocusRef.current = e;
                  }
                }}
              />
              <FormErrorMessage>{errors.productName?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Controller
              control={control}
              name="Developers"
              render={({
                field: { onChange, value },
                formState: { isSubmitting },
              }) => (
                <FormControl isInvalid={!!errors.Developers}>
                  <FormLabel htmlFor="Developers">Developers</FormLabel>
                  <TagInput
                    id="Developers"
                    onChange={onChange}
                    isSubmitting={isSubmitting}
                    value={value}
                  />
                  <FormHelperText fontSize={12} color="GrayText">
                    Enter name and press "Enter"
                  </FormHelperText>
                  <FormErrorMessage>
                    {errors.Developers?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
          </GridItem>
          <FormControl isInvalid={!!errors.productOwnerName}>
            <FormLabel htmlFor="productOwnerName">Product Owner Name</FormLabel>
            <Input
              id="productOwnerName"
              placeholder="Product Owner Name"
              {...register("productOwnerName")}
            />
            <FormErrorMessage>
              {errors.productOwnerName?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.scrumMasterName}>
            <FormLabel htmlFor="scrumMasterName">Scrum Master Name</FormLabel>
            <Input
              id="scrumMasterName"
              placeholder="Scrum Master Name"
              {...register("scrumMasterName")}
            />
            <FormErrorMessage>
              {errors.scrumMasterName?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.startDate}>
            <FormLabel htmlFor="startDate">Start Date</FormLabel>
            <Input
              id="startDate"
              placeholder="Start Date"
              type="date"
              {...register("startDate")}
            />
            <FormErrorMessage>{errors.startDate?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.methodology}>
            <FormLabel htmlFor="methodology">Methodology</FormLabel>
            <Select id="methodology" {...register("methodology")}>
              <option value={Methodology.AGILE}>Agile</option>
              <option value={Methodology.WATERFALL}>Waterfall</option>
            </Select>
            <FormErrorMessage>{errors.methodology?.message}</FormErrorMessage>
          </FormControl>
        </SimpleGrid>
      </ModalBody>
      <ModalFooter>
        <ButtonGroup>
          <>
            {(!isSubmitSuccessful || error) && (
              <Button type="submit" isLoading={isSubmitting}>
                Submit
              </Button>
            )}
            <Button type="button" variant="outline" onClick={onClose}>
              {isSubmitSuccessful && !error ? "Close" : "Cancel"}
            </Button>
          </>
        </ButtonGroup>
      </ModalFooter>
    </form>
  );
};

export default AddProductForm;
