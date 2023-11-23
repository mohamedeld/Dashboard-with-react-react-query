import Button from "../../ui/Button";
import useCheckout from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { isCheckout, checkOutMutate } = useCheckout();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkOutMutate(bookingId)}
      disabled={isCheckout}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
