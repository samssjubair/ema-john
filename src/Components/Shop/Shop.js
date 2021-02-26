import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const allData=fakeData;
    const [products,setProduct]= useState(allData);
    const [cart,setCart]= useState([]);
    // console.log(products);
    const cartClickHandler=(product)=>{
        const newCart=[...cart,product];
        setCart(newCart);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                <ul>
                    {
                        products.map(pd => <Product cartClickHandler={cartClickHandler} product={pd}></Product>)
                    } 
                </ul>
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;