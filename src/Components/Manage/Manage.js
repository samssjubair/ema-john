import React from 'react';
import fakeData from '../../fakeData';

const Manage = () => {
    const handleAddProduct=()=>{
        const product={};
        fetch('https://ema-john-server.up.railway.app/addProduct',{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(product)
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
    }
    return (
        <div>
            <form action="">
                <p><span>Product: </span><input type="text"/></p>
                <p><span>Quantity: </span><input type="text"/></p>
                <p><span>Price: </span><input type="text"/></p>
                <p><span>Upload product picture</span><input type="file"/></p>
                <button type="submit">Add Product</button>
            </form>
            
        </div>
    );
};

export default Manage;