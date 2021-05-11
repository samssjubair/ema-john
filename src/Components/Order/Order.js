import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happygif from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Order = () => {
    const [cart,setCart]=useState([]);
    const history= useHistory();
    const [orderPlace,setOrderPlace]=useState(false);
    const handleProceedCheckout=()=>{
        history.push('/shipment')
    }
    let orderPlaceGif;
    if(orderPlace){
        orderPlaceGif= <img src={happygif} alt=""/>
    }
    
    useEffect(()=>{
        const savedCart=getDatabaseCart();
        console.log(savedCart);
        const productKeys=Object.keys(savedCart);
        console.log(productKeys);
        fetch('https://glacial-sea-32533.herokuapp.com/productByKeys',{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(productKeys)
        })
        .then(res=>res.json())
        .then(data=>{setCart(data);
        console.log("data",data);})
        
    },[cart]);
    const handleDelete=(productKey)=>{
        const newCart=cart.filter(p=>p.key!==productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(pd=> <ReviewItem handleDelete={handleDelete} pd={pd}></ReviewItem> )
                }
                {
                    orderPlaceGif
                }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="cart-btn">Proceed Checkout</button>
                </Cart>
                
            </div>
        </div>
    );
};

export default Order;