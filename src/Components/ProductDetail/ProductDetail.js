import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {prodKey}= useParams();
    const product= fakeData.find(pd=>pd.key===prodKey);

    return (
        <div>
            <h1>Product {prodKey}</h1>
            <Product buttonShow={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;