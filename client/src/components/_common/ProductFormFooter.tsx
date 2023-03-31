import { Button, ButtonGroup } from "@chakra-ui/react";

interface Props {
  isSubmitSuccessful: boolean;
  isSubmitting: boolean;
  error: unknown;
  onCloseClick: () => void;
}

const ProductFormFooter = ({
  isSubmitSuccessful,
  error,
  isSubmitting,
  onCloseClick,
}: Props) => {
  return (
    <ButtonGroup>
      <>
        {(!isSubmitSuccessful || error) && (
          <Button type="submit" isLoading={isSubmitting}>
            Submit
          </Button>
        )}
        <Button type="button" variant="outline" onClick={onCloseClick}>
          {isSubmitSuccessful && !error ? "Close" : "Cancel"}
        </Button>
      </>
    </ButtonGroup>
  );
};

export default ProductFormFooter;
