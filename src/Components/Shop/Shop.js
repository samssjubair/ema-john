import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';

const Shop = () => {
    const [cart,setCart]= useState([]);
    useEffect(()=>{
        const savedCart=getDatabaseCart();
        const productKeys=Object.keys(savedCart);
        const cartProducts=productKeys.map(key=>{
            const product=fakeData.find(pd=>pd.key===key);
            product.quantity=savedCart[key];
            return product;
        })
        setCart(cartProducts);
    },[])
    const allData=fakeData;
    const [products,setProduct]= useState(allData);
    
    // console.log(products);
    const cartClickHandler=(product)=>{
        const toBeAdded=product.key;
        const sameProduct=cart.find(pd=>pd.key===toBeAdded);
        let count=1;
        let newCart;
        if(sameProduct){
            count=sameProduct.quantity+1;
            sameProduct.quantity=count;
            const others=cart.filter(pd=>pd.key!==toBeAdded);
            newCart=[...others,sameProduct];
        }
        else{
            product.quantity=1;
            newCart=[...cart,product];  
        }
        setCart(newCart);
        
        addToDatabaseCart(product.key,count);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                <ul>
                    {
                        products.map(pd => <Product
                            key={pd.id}
                             cartClickHandler={cartClickHandler}
                              buttonShow={true} 
                              product={pd}>

                              </Product>)
                    } 
                </ul>
            </div>
            <div className="cart-container">

                <Cart cart={cart}>
                    <Link to="/order">
                        <button className="cart-btn">Review Order</button>
                    </Link>
                
                </Cart>
            </div>
        </div>
    );
};

export default Shop;