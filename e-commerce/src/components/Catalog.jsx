import React from 'react';
import { useState, useEffect } from 'react';
import productsData from '../data/products_mock.json';
import Products from './Products';

const Catalog = () => {
    return (
        <>
            <h1>Catalogo de Produtos</h1>
            <div className="product-container">
                {productsData.map((product) => {
                    <Products key={product.id} product={product}/>
                })}
            </div>
        </>        
    );
};

export default Catalog;