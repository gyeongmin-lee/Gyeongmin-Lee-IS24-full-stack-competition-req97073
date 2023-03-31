import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  GridItem,
  Input,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { format } from "date-fns";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { Methodology, NewProductEntry } from "../../types";
import TagInput from "./TagInput";

interface Props {
  errors: FieldErrors<NewProductEntry>;
  register: UseFormRegister<NewProductEntry>;
  initialFocusRef: React.MutableRefObject<HTMLInputElement | null>;
  control: Control<NewProductEntry, any>;
}

const ProductFormFields = ({
  errors,
  register,
  initialFocusRef,
  control,
}: Props) => {
  const { ref, ...rest } = register("productName");

  return (
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
              <FormErrorMessage>{errors.Developers?.message}</FormErrorMessage>
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
        <FormErrorMessage>{errors.productOwnerName?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.scrumMasterName}>
        <FormLabel htmlFor="scrumMasterName">Scrum Master Name</FormLabel>
        <Input
          id="scrumMasterName"
          placeholder="Scrum Master Name"
          {...register("scrumMasterName")}
        />
        <FormErrorMessage>{errors.scrumMasterName?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.startDate}>
        <FormLabel htmlFor="startDate">Start Date</FormLabel>
        <Input
          id="startDate"
          placeholder="Start Date"
          type="date"
          {...register("startDate", {
            setValueAs: (value) => {
              const newDate = new Date(value);
              const dtDateOnly = new Date(
                newDate.valueOf() + newDate.getTimezoneOffset() * 60 * 1000
              );
              return format(dtDateOnly, "yyyy/MM/dd");
            },
          })}
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
  );
};

export default ProductFormFields;
