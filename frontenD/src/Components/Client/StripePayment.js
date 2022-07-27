import "../../App.css";
import StripeCheckout from "react-stripe-checkout";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../Features/orderSlice";
import { clearCart } from "../../Features/cartSlice";
import LoginAccount from "./LoginAccount";

const MySwal = withReactContent(Swal);
function StripePayment() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { isLoggedInClient, user } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  let tabc = [];
  cart.cartItems.map((c) => {
    tabc.push({
      id: c._id,
      quantitiy: c.cartQuantity,
      price: c.cartQuantity * c.prixVente,
    });
  });




  
  const { total } = useParams();
  const publishableKey =
    "pk_test_51LPiu8G8mBcd3AzvO1hlI8VflSlphSM4DNUvVfRDs3YAWJoTAZVucQzflrHk0U2TmICLBXXz3Om1jl8L9JXAf7xG00Y2I2tQPC";
  const [product] = useState({
    name: "Total",
    price: `${total}`,
  });
  const priceForStripe = product.price * 100;
  const handleSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Payment was successful",
      time: 4000,
    });
    let order = {
      allProduct: tabc,
      user: user.user,
      amount: total,
    };
    dispatch(createOrder(order));
    dispatch(clearCart());
    navigate("/");
  };

  const handleFailure = () => {
    MySwal.fire({
      icon: "error",
      title: "Payment was not successful",
      time: 4000,
    });
  };
  const payNow = async (token) => {
    console.log(JSON.stringify(token));
    try {
      const response = await axios({
        url: "http://localhost:3001/api/payment",
        method: "post",
        data: {
          amount: product.price * 100,
          token,
        },
      });
      if (response.status === 200) {
        handleSuccess();
      }
    } catch (error) {
      handleFailure();
      console.log(error);
    }
  };
  return (
    <>
      {isLoggedInClient ? (
        <>
          <div className="container">
            <h2>Complete payment </h2>
            <p>{product.name}</p>
            <p>{product.price} TND</p>
            <StripeCheckout
              stripeKey={publishableKey}
              label="Pay Now"
              name="Pay With Credit Card"
              billingAddress
              shippingAddress
              amount={priceForStripe}
              description={`Your total is ${product.price} TND`}
              token={payNow}
            />
          </div>
        </>
      ) : (
        <>
          <LoginAccount />
        </>
      )}
    </>
  );
}
export default StripePayment;
