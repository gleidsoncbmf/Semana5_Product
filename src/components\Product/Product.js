import React, { useReducer } from 'react';
import './Product.css';

const currencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
  
  function getTotal(cart) {
    const total = cart.reduce((totalCost, item) => totalCost + item.price, 0);
    return total.toLocaleString(undefined, currencyOptions)
  }

  const products = [
    {
        id: 1,
      emoji: '🍦',
      name: 'casquinha',
      price: 1.00
    },
    {
        id: 2,
      emoji: '🍩',
      name: 'rosquinha',
      price: 2.00,
    },
    {
        id: 3,
      emoji: '🍉',
      name: 'melancia',
      price: 4.00
    },
    {
        id: 4,
        emoji: '☕',
        name: 'café',
        price: 3.00
    }
  ];

    function cartReducer(state, action) {
        switch(action.type) {
          case 'add':
            return [...state, action.product];
          case 'remove':
            const productIndex = state.findIndex(item => item.name === action.product.name);
            if(productIndex < 0) {
              return state;
            }
            const update = [...state];
            update.splice(productIndex, 1)
            return update
          default:
            return state;
        }
      }

export default function Product() {
    const [cart, setCart] = useReducer(cartReducer, []);
  
    function add(product) {
      setCart({ product, type: 'add' });
    }
  
    function remove(product) {
      setCart({ product, type: 'remove' });
    } 
  
    return(
      <div className="wrapper">
        <div>
          Shopping Cart: {cart.length} total items.
        </div>
        <div>Total: {getTotal(cart)}</div>
  
        <div>
          {products.map(product => (
            <div key={product.name}>
              <div className="product">
                <span role="img" aria-label={product.name}>{product.emoji}</span>
                <section> {product.name} </section>
              </div>
              <button onClick={() => add(product)}>Add</button>
              <button onClick={() => remove(product)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    )
  }
