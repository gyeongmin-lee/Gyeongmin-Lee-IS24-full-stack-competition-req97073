import { Button, ButtonGroup } from "@chakra-ui/react";

interface Props {
  /**
   * Boolean that determines whether the form has been submitted successfully.
   */
  isSubmitSuccessful: boolean;
  /**
   * Boolean that determines whether the form is currently submitting.
   */
  isSubmitting: boolean;
  /**
   * Error from the form submission.
   */
  error: unknown;
  /**
   * Function that is called when the `Cancel` button is clicked.
   */
  onCloseClick: () => void;
}

/**
 * `ProductFormFooter` is a component that renders the footer of the product form.
 * It renders a `ButtonGroup` that contains a `Submit` button and a `Cancel` button that
 * changes depending on the form state.
 */
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
