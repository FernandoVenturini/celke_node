import React from 'react'

const Products = (product) => {
    return (
        <div className='product'>
            <img src={product.image}  alt={product.name} />
            <h3>{product.image}</h3>
            <p>${product.price}</p>

            <div className="cart-buttons">
                <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <button>Adicionar ao Carrinho</button>
            </div>
        </div>
    )
}

export default Products