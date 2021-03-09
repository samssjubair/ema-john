import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key,price}=props.pd;
    return (
        <div className="review-item">
            <h2>{name}</h2>
            <h2>{quantity}</h2>
            <h3>${price}</h3>
            <button onClick={()=>props.handleDelete(key)} className="cart-btn">Delete</button>
        </div>
    );
};

export default ReviewItem;