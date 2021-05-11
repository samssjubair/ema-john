import React from 'react';

import './Cart.css'

const Cart = (props) => {
    
    const fixed=n=>n.toFixed(2);
    const cart=props.cart;
    
    const subTotal=cart.reduce((acc,prod)=>acc+=(prod.price*(prod.quantity || 1)),0);
    
    let shipping=0;
    if(subTotal>200){
        shipping=0;
    }
    else if(subTotal>100){
        shipping=5.99;
    }
    else if(subTotal>0){
        shipping=9.99;
    }
    const tax= (subTotal *(5/100));
    const total= subTotal+tax+shipping;
    

    return (
        <div>
            <h2>Order History</h2>
            <h3>Items ordered: {cart.length}</h3>
            <h4>Sub Total Price: {fixed(subTotal)}</h4>
            <h4>Shipping cost: {fixed(shipping)}</h4>
            <h4>Tax: {fixed(tax)}</h4>
            <hr/>
            <h3>Total Price: {fixed(total)}</h3>
            {
                props.children
            }
            
        </div>
    );
};

export default Cart;