import { useState } from 'react'
import './App.css'

const Display = ({result, price, discount}) => {
  return (
    <div className='flex flex-col mb-8 justify-center'>
      <h1 className="flex-auto text-3xl font-bold tracking-tight py-6 text-gray-900 sm:text-4xl">
        {result}
      </h1>
      <div className='flex flex-row justify-start'>
        <p className='flex-auto w-64'>Input price <br /><strong>{price}</strong></p>
        <p className='flex-auto w-64'>Input discount <br /><strong>{discount}%</strong></p>
      </div>
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <div className='mt-8'>
      <button
        className="w-full bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
        >
        {text}
      </button>
    </div>
  )
}

const Input = ({handleChange, placeholder, id}) => {
  return (
    <div className='mt-4'>
      <input
          type="number"
          id={id}
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={placeholder}
          onChange={handleChange}
          aria-describedby="price-description"
        />
    </div>
  )
}

function App() {
  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [result, setResult] = useState(price)

  const handlePriceChange = (event) => {
    setPrice(parseFloat(event.target.value) || 0);
  }
  const handleDiscountChange = (event) => {
    setDiscount(parseFloat(event.target.value) || 0);
  }
  const calculateDiscount = () => {
    const discountedPrice = price - (price * discount / 100)
    setResult(discountedPrice)
  }

  return (
    <div className="flex flex-col mx-auto max-w-xl sm:px-6 lg:px-8">
      <div>
      <Display
        result={new Intl.NumberFormat('id-ID').format(result)}
        price={new Intl.NumberFormat('id-ID').format(price)}
        discount={discount}
      />
      </div>
      <Input handleChange = {handlePriceChange} placeholder={"Input price"} id={"price"} />
      <Input handleChange = {handleDiscountChange} placeholder ={"Input discount"} id={"discount"} />
      <Button handleClick= {calculateDiscount} text={"Calculate"} />
  </div>
  )
}

export default App
