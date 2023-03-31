import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import productService from "../services/products";
import { Methodology, NewProductEntry } from "../types";
import { commonToastProps } from "../utils/props";
import { productSchema } from "../utils/schema";
import ProductFormFields from "./_common/ProductFormFields";
import ProductFormFooter from "./_common/ProductFormFooter";

const defaultValues: NewProductEntry = {
  productName: "",
  productOwnerName: "",
  Developers: [],
  scrumMasterName: "",
  startDate: format(new Date(), "yyyy-MM-dd"),
  methodology: Methodology.AGILE,
};

const AddProduct = () => {
  const children = useBreakpointValue({
    base: "Add",
    sm: "Add Product",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);

  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NewProductEntry>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const { error, mutateAsync } = useMutation(productService.addProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

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

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        position="fixed"
        bottom={5}
        right={5}
        boxShadow="md"
        padding={3}
        onClick={onOpen}
        size={{ base: "md", md: "lg" }}
      >
        {children}
      </Button>
      <Modal
        initialFocusRef={initialRef}
        size="xl"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Product</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <ProductFormFields
                control={control}
                initialFocusRef={initialRef}
                errors={errors}
                register={register}
              />
            </ModalBody>
            <ModalFooter>
              <ProductFormFooter
                isSubmitSuccessful={isSubmitSuccessful}
                isSubmitting={isSubmitting}
                error={error}
                onCloseClick={onClose}
              />
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddProduct;
