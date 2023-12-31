import axios from "axios";
import myKey from "./KhaltiKey";
import { toast } from "react-toastify";

let config = {
  // replace this key with yours
  publicKey: myKey.publicTestKey,
  productIdentity: "1234567890",
  productName: "GRIHA",
  productUrl: "http://localhost:3000",
  eventHandler: {
    onSuccess(payload) {
      // hit merchant api for initiating verfication
      console.log(payload);
      let data = {
        token: payload.token,
        amount: payload.amount,
      };

      let config = {
        headers: {
          Authorization: myKey.secretKey,
        },
      };

      axios
        .post(
          `https://bookstore-backend-bice.vercel.app/api/payment/khalti-pay`,
          data,
          config
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      toast.success("Payment Successful");
    },
    // onError handler is optional
    onError(error) {
      // handle errors
      console.log(error);
    },
    onClose() {
      console.log("widget is closing");
    },
  },
  paymentPreference: [
    "KHALTI",
    "EBANKING",
    "MOBILE_BANKING",
    "CONNECT_IPS",
    "SCT",
  ],
};

export default config;
