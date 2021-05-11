import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import Order from "../Order/Order";
import PaymentProcess from "../PaymentProcess/PaymentProcess";
import "./Shipment.css";
const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [shippingInfo,setShippingInfo]= useState(null);
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    setShippingInfo(data);
  };

  const handlePaymentSuccess=(paymentId)=>{

    const savedCart = getDatabaseCart();
    const orderDetail = {
      ...loggedInUser,
      products: savedCart,
      paymentId: paymentId,
      shipment: shippingInfo,
      placedTime: new Date(),
    };
    fetch("https://glacial-sea-32533.herokuapp.com/addOrder", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(orderDetail),
    })
      .then((res) => res.json())
      .then((data) => {
        processOrder();
        alert("Order placed successfully");
      });

  }


  return (
    <div className="row">
      <div style={{display: shippingInfo? 'none': 'block'}} className="col-md-6">
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            name="name"
            placeholder="Your Name"
            defaultValue={loggedInUser.userName}
            ref={register({ required: true })}
          />
          {errors.name && <span className="error">Name is required</span>}

          <input
            name="email"
            placeholder="Email"
            defaultValue={loggedInUser.email}
            ref={register({ required: true })}
          />
          {errors.email && <span className="error">Email is required</span>}

          <input
            name="address"
            placeholder="Address"
            ref={register({ required: true })}
          />
          {errors.address && <span className="error">Address is required</span>}

          <input
            name="phone"
            placeholder="Contact"
            ref={register({ required: true })}
          />
          {errors.phone && <span className="error">Phone no is required</span>}

          <input type="submit" />
        </form>
      </div>
      <div style={{display: shippingInfo? 'block': 'none'}} className="col-md-6">
        <h2>Payment</h2>
        <PaymentProcess handlePaymentSuccess={handlePaymentSuccess}></PaymentProcess>
      </div>
    </div>
  );
};

export default Shipment;
