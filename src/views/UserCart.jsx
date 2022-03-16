import React from 'react'
import { useEffect, useState } from 'react'
const rupiahChecker = (x) => {
    return 'Rp. ' + x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}
const buttonQuantity = (quantity, flag) => {
    if(flag === 'increment') {
        quantity++
    } else if (flag === 'decrement') {
        quantity--
    }
}
const CartComponent = ({product, quantity, increase, decrease}) => product.map((index, i) => (
    <div className="flex mb-6" key={i}>
        <div className=" flex">
            <div className=" w-16 h-16 bg-gray-500"></div>
            <div className=" my-auto ml-4 flex justify-between">
                <div>
                    <p>{index.eventData.item}</p>
                    <p>{rupiahChecker(index.eventData.price)}</p>
                </div>
                <div>
                    <button onClick={decrease}>-</button>
                    <p>{quantity}</p>
                    <button onClick={increase}>+</button>
                </div>
            </div>
        </div>
    </div>
))
export default function UserCart() {
    const [cart, setcart] = useState([])
    const [quantity, setquantity] = useState(0)
    const handleMessage = (event) => {
        const itemData = event.data
        if(event.origin !== 'http://localhost:8080') {
            return
        }
        if(event.data.eventName === 'addToCart') {
            if(cart.some(e => e.eventData.item === itemData.eventData.item)) {
                for(var i in cart) {
                     setquantity(cart[i].eventData.quantity += itemData.eventData.quantity)
                }
            } else {
                cart.push(itemData)
                setcart([...cart])
            }
        }
    }
    const increaseAmount = () => {
        for(var i in cart) {
            setquantity(cart[i].eventData.quantity += 1)
        }
    }
    const decreaseAmount = () => {
        for(var i in cart) {
            setquantity(cart[i].eventData.quantity -= 1)
        }
        if(quantity === 0) {
            setquantity(Math.max(0, quantity))
        }
    }
    useEffect(() => {
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    },[])
  return (
    <div>
        <div className=" w-96 p-3 m-auto min-h-screen bg-white border-t-2 border-yellow-400">
            <p className=" text-3xl font-bold mb-4">Your Cart</p>
            {
                cart.length === 0 ? <p>Cart is empty</p> : 
                <CartComponent 
                    product={cart} 
                    quantity={quantity}
                    increase={increaseAmount}
                    decrease={decreaseAmount} />
            }
        </div>
    </div>
  )
}
