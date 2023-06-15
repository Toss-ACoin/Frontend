import { Button } from "@chakra-ui/react";
import { usePaymentService } from "@services/PaymentService";
import { useMutation } from "@tanstack/react-query";
import { ReactElement } from "react";

const Payments = (): ReactElement => {
  const paymentService = usePaymentService();
  const { mutate } = useMutation(paymentService.sendPayment);
  return <Button onClick={() => mutate()}>Pay</Button>;
};
export default Payments;
