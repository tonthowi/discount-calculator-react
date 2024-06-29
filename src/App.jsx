import { useState } from 'react';
import './App.css';

// Display component to show the result, price, and discount
const Display = ({ result, price, discount, diff }) => {
  return (
    <div className='flex flex-col mb-8 justify-center'>
      <h1 className="flex-auto text-3xl font-bold tracking-tight py-6 text-gray-900 sm:text-4xl">
        {result} {/* Displaying the result */}
      </h1>
      <div className='flex flex-row justify-start'>
        <p className='flex-auto w-64'>Price <br /><strong>{price}</strong></p> {/* Displaying the price */}
        <p className='flex-auto w-64'>Discount <br /><strong>{discount}%</strong></p>
        <p className='flex-auto w-64 text-green-700'>You are saving <br /><strong>{diff}</strong></p> {/* Displaying the price difference */}
      </div>
    </div>
  );
}

// Button component to create a button with customizable text and class name
const Button = ({ handleClick, text, className }) => {
  return (
    <div className='mt-6'>
      <button
        className={`w-full font-bold py-2 px-4 rounded ${className}`} // Applying custom styles passed as className
        onClick={handleClick} // Handling button click
      >
        {text} {/* Displaying button text */}
      </button>
    </div>
  );
}

// Input component to create a number input field
const Input = ({ handleChange, placeholder, id, value }) => {
  return (
    <div className='mt-4'>
      <input
        type="number" // Input type is number
        id={id} // Assigning id to input
        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" // Styling the input
        placeholder={placeholder} // Placeholder text
        value={value} // Setting input value
        onChange={handleChange} // Handling input change
        aria-describedby="price-description" // Accessibility attribute
      />
    </div>
  );
}

function App() {
  // State variables to store price, discount, and result
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [result, setResult] = useState(0);
  const [diff, setDiff] = useState(0);

  // Handler for price input change
  const handlePriceChange = (event) => {
    setPrice(event.target.value); // Update price state with input value
  }

  // Handler for discount input change
  const handleDiscountChange = (event) => {
    setDiscount(event.target.value); // Update discount state with input value
  }

  // Function to calculate the discounted price
  const calculateDiscount = () => {
    const parsedPrice = parseFloat(price) || 0; // Parse price to float, default to 0 if invalid
    const parsedDiscount = parseFloat(discount) || 0; // Parse discount to float, default to 0 if invalid
    const discountedPrice = parsedPrice - (parsedPrice * parsedDiscount / 100); // Calculate discounted price
    setResult(discountedPrice); // Update result state with discounted price
    setDiff(parsedPrice - discountedPrice) // Calculate price difference
  }

  // Function to clear all inputs
  const clearInputs = () => {
    setPrice(''); // Reset price state to empty
    setDiscount(''); // Reset discount state to empty
    setResult(0); // Reset result state to 0
  }

  return (
    <div className="flex flex-col mx-auto max-w-xl sm:px-6 lg:px-8">
      <div>
        <Display
          result={new Intl.NumberFormat('id-ID').format(result)} // Format result for display
          price={new Intl.NumberFormat('id-ID').format(parseFloat(price) || 0)} // Format price for display
          discount={discount} // Pass discount to Display component
          diff={new Intl.NumberFormat('id-ID').format(parseFloat(diff) || 0 )} // Pass price difference to Display component
        />
      </div>
      <Input
        value={price} // Pass price state as value
        handleChange={handlePriceChange} // Pass handlePriceChange as change handler
        placeholder={"Input price"} // Placeholder text
        id={"price"} // Input id
      />
      <Input
        value={discount} // Pass discount state as value
        handleChange={handleDiscountChange} // Pass handleDiscountChange as change handler
        placeholder={"Input discount"} // Placeholder text
        id={"discount"} // Input id
      />
      <Button
        handleClick={calculateDiscount} // Pass calculateDiscount as click handler
        text={"Calculate"} // Button text
        className={"bg-slate-900 hover:bg-slate-700 text-white"} // Button styles
      />
      <Button
        handleClick={clearInputs} // Pass clearInputs as click handler
        text={"Clear All Input"} // Button text
        className={"ring-1 ring-inset ring-gray-300 hover:bg-gray-50"} // Button styles
      />
    </div>
  );
}

export default App;
