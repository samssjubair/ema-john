import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {prodKey}= useParams();
    const [product,setProduct]= useState({});
    useEffect(()=>{
        fetch('https://glacial-sea-32533.herokuapp.com/product/'+prodKey)
        .then(res=>res.json())
        .then(data=>setProduct(data))
    },[prodKey])

    return (
        <div>
            <h1>Product {prodKey}</h1>
            <Product buttonShow={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;