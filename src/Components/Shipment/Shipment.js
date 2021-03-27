import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import Order from '../Order/Order';
import './Shipment.css'
const Shipment = () => {
    const [loggedInUser,setLoggedInUser]= useContext(UserContext);
    const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    const savedCart=getDatabaseCart();
    const orderDetail={...loggedInUser,products: savedCart,shipment: data,placedTime: new Date()};
    fetch('https://glacial-sea-32533.herokuapp.com/addOrder',{
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(orderDetail)
    })
    .then(res=>res.json())
    .then(data=>{
      processOrder();
      alert("Order placed successfully")
    })
  }

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
    
      <input name="name" placeholder="Your Name" defaultValue={loggedInUser.userName} ref={register({ required: true })} />
      {errors.name && <span className="error">Name is required</span>}

      <input name="email" placeholder="Email" defaultValue={loggedInUser.email} ref={register({ required: true })} />
      {errors.email && <span className="error">Email is required</span>}

      <input name="address" placeholder="Address"  ref={register({ required: true })} />
      {errors.address && <span className="error">Address is required</span>}

      <input name="phone" placeholder="Contact" ref={register({ required: true })} />
      {errors.phone && <span className="error">Phone no is required</span>}
      
      
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;