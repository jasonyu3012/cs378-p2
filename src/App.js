import './App.css';
import { Header } from './components/Header';
import MenuItem from './components/MenuItem';
import React, { useState } from 'react';
import OrderSummary from './components/OrderSummary';

// import 'bootstrap/dist/css/bootstrap.min.css'; // This imports bootstrap css styles. You can use bootstrap or your own classes by using the className attribute in your elements.

// Menu data. An array of objects where each object represents a menu item. Each menu item has an id, title, description, image name, and price.
// You can use the image name to get the image from the images folder.

const menuItems = [
  {
    id: 1,
    title: 'Gyoza',
    description: 'Japanese dumplings',
    imageName: 'gyoza.png',
    price: 5.99,
  },
  {
    id: 2,
    title: 'Sushi',
    description: 'Japanese rice rolls',
    imageName: 'sushi.png',
    price: 6.99,
  },
  {
    id: 3,
    title: 'Ramen',
    description: 'Japanese noodle soup',
    imageName: 'ramen.png',
    price: 7.99,
  },
  {
    id: 4,
    title: 'Matcha Cake',
    description: 'Japanese green tea cake',
    imageName: 'matcha-cake.png',
    price: 4.99,
  },
  {
    id: 5,
    title: 'Mochi',
    description: 'Japanese rice cake',
    imageName: 'mochi.png',
    price: 3.99,
  },
  {
    id: 6,
    title: 'Yakitori',
    description: 'Japanese skewered chicken',
    imageName: 'yakitori.png',
    price: 2.99,
  },
  {
    id: 7,
    title: 'Takoyaki',
    description: 'Japanese octopus balls',
    imageName: 'takoyaki.png',
    price: 5.99,
  },
  {
    id: 8,
    title: 'Sashimi',
    description: 'Japanese raw fish',
    imageName: 'sashimi.png',
    price: 8.99,
  },
  {
    id: 9,
    title: 'Okonomiyaki',
    description: 'Japanese savory pancake',
    imageName: 'okonomiyaki.png',
    price: 6.99,
  },
  {
    id: 10,
    title: 'Katsu Curry',
    description: 'Japanese curry with fried pork',
    imageName: 'katsu-curry.png',
    price: 9.99,
  }
];


function App() {
  // initialize an object containing the id, and the quantity of each menu item
  // menuItems.reduce takes in two parameters (accumulator function, starting object). Now our default useState for our quantity is a bunch of id's with quantity 0.
  // quantity is now an object that stores a bunch of ids as the keys and 0's as the value.
  const [quantity, setQuantity] = useState(menuItems.reduce((total, item) => {
    total[item.id] = 0;
    return total
  }, {}))

  const handleIncrement = (itemId) => {
    // because quantity is an object array that is unmutable, we use currentQuanity or prevQuantity as our parameter for a function into setQuantity, instead of
    // hard setting a number
    // the object looks like this rn: id: 0 id: 0 id: 0        itemid here  grab the current quantity and increment
    setQuantity(currentQuantity => {return {...currentQuantity, [itemId]: currentQuantity[itemId] + 1}})
  }

  const handleDecrement = (itemId) => {
    setQuantity(currentQuantity => {return {...currentQuantity, [itemId] : Math.max(0, currentQuantity[itemId] - 1)}}  )
  }

  const calcSubtotal = () => {
    // we reduce menuItems to get the menu item id and the price, so we can access the quantity object
    return menuItems.reduce((total, item) => {
      return total + (quantity[item.id] * item.price);
    }, 0).toFixed(2);
  }

  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const clearAll = () => {
    setQuantity(currentQuantity => {
      const resetQuantity = {};
      Object.keys(currentQuantity).forEach(key => {
        resetQuantity[key] = 0;
      });
      return resetQuantity;
    });
  }

  return (
    // Fragmentation
    <>
      <Header/>    
      <div>
      {
        menuItems.map(item => {
          return <div className='MenuItemDiv'>
            <MenuItem item={item}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            // we're directly passing in the quantity here, by passing in quantity[item.id] we are accessing the number stored there and passing it in as quantity
            quantity={quantity[item.id]}
            />
            {/* whats in curly braces is what's being passed in, left is the prop name being passed to the component. */}
          </div>
        })
      }
      <h2>Subtotal: ${calcSubtotal()}</h2>
      <div className='btn-container'>
        <button className='btn' onClick={clearAll}>Clear All</button>
        <button className='btn' onClick={() => setShowOrderSummary(true)}>Order</button>
      </div>
      {showOrderSummary && (
        <OrderSummary
          menuItems={menuItems}
          quantities={quantity}
          onClose={() => setShowOrderSummary(false)}
          />
      )}
      </div>
    </>
  );
}

export default App;
