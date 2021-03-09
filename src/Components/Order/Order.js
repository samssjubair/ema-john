import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happygif from '../../images/giphy.gif'

const Order = () => {
    const [cart,setCart]=useState([]);
    const [orderPlace,setOrderPlace]=useState(false);
    const orderPlaceHandler=()=>{
        processOrder();
        setCart([]);
        setOrderPlace(true);
    }
    let orderPlaceGif;
    if(orderPlace){
        orderPlaceGif= <img src={happygif} alt=""/>
    }
    
    useEffect(()=>{
        const savedCart=getDatabaseCart();
        const productKeys=Object.keys(savedCart);
        const cartProducts=productKeys.map(key=>{
            const product =fakeData.find(pd=>pd.key===key)
            product.quantity=savedCart[key];
            return product;
        })
        setCart(cartProducts)
    },[]);
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
                    <button onClick={orderPlaceHandler} className="cart-btn">Place order</button>
                </Cart>
                
            </div>
        </div>
    );
};

export default Order;