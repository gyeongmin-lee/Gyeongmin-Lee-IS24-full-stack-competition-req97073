import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
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
import { NewProductEntry, Product } from "../types";
import { commonToastProps } from "../utils/props";
import { productSchema } from "../utils/schema";
import ProductFormFields from "./_common/ProductFormFields";

interface Props {
  product: Product | undefined;
}

const EditProductDrawer = ({ product }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const initialRef = useRef(null);

  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewProductEntry>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      ...product,
      startDate: product && format(new Date(product.startDate), "yyyy-MM-dd"),
    },
  });

  const { error, mutateAsync } = useMutation(productService.updateProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  const onSubmit = async (values: NewProductEntry) => {
    if (!product) return;

    try {
      await mutateAsync({ id: product?.productId, updatedProduct: values });

      setTimeout(() => reset(), 500);
      onClose();
      toast({
        title: "Product updated.",
        description: `We've updated ${values.productName}`,
        status: "success",
        ...commonToastProps,
      });
    } catch (e) {
      let errorMessage = "Unable to update product.";

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
      <IconButton
        aria-label={
          product ? `Edit product ${product.productId}` : "Disabled Edit"
        }
        disabled={!product}
        variant="ghost"
        size="md"
        w="min-content"
        minW="min-content"
        h="min-content"
        padding="0.5"
        ref={btnRef}
        onClick={onOpen}
        icon={<EditIcon />}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        size="sm"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton top={3} />
          <DrawerHeader>Edit Product</DrawerHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerBody>
              <ProductFormFields
                control={control}
                initialFocusRef={initialRef}
                errors={errors}
                register={register}
              />
            </DrawerBody>
            <DrawerFooter>
              <ButtonGroup>
                <Button type="submit" isLoading={isSubmitting}>
                  Submit
                </Button>
                <Button type="button" variant="outline" onClick={onClose}>
                  Close
                </Button>
              </ButtonGroup>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default EditProductDrawer;
