import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import AddProductForm from "./AddProductForm";

const AddProduct = () => {
  const children = useBreakpointValue({
    base: "Add",
    sm: "Add Product",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);

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
          <AddProductForm onClose={onClose} initialFocusRef={initialRef} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddProduct;
