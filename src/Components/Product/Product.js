import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
    console.log(props.product.name);
    const {name, img,price,stock,seller}=props.product;
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt=""/>
            </div>
            <div>
                <h1>{name}</h1> <br/>
                <p><small>by {seller}</small></p>
                <h2>${price}</h2>
                <p><small>Only {stock} left in stock</small></p>
                <button onClick={()=>props.cartClickHandler(props.product)} className="cart-btn"><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>

            </div>

            
        </div>
    );
};

export default Product;