import React from 'react'
import { useEffect, useState } from 'react'
const rupiahChecker = (x) => {
    return 'Rp. ' + x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}
export default function UserCart() {
    const [cart, setcart] = useState([])
    const [quantity, setquantity] = useState(0)
    const TestComponent = (product) => product.map((product, i) => (
        <div className="flex mb-6" key={i}>
            <div className=" flex">
                <div className=" w-16 h-16 bg-gray-500"></div>
                <div className=" my-auto ml-4 flex justify-between">
                    <div>
                        <p>{product.eventData.item}</p>
                        <p>{rupiahChecker(product.eventData.price)}</p>
                    </div>
                    <div>
                        <button onClick={() => decreaseAmount(product.eventData.item)}>-</button>
                        <p>{product.eventData.quantity}</p>
                        <button onClick={() => increaseAmount(product.eventData.item)}>+</button>
                    </div>
                    <div>
                        <button onClick={() => deleteItem(product.eventData.item)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    ))
    const handleMessage = (event) => {
        const itemData = event.data
        if(event.origin !== 'http://localhost:8080') {
            return
        }
        if(event.data.eventName === 'addToCart') {
            if(cart.some(e => e.eventData.item === itemData.eventData.item)) {
                alert('Item already in cart')
            } else {
                cart.push(itemData)
                setcart([...cart])
            }
        }
    }
    const increaseAmount = (name) => {
        let increaseQuantity = cart.find(item => item.eventData.item === name)
        if(cart.some(e => e.eventData.item === name)) {
            setquantity(increaseQuantity.eventData.quantity ++)
        }
        return increaseQuantity.eventData.quantity
    }
    const decreaseAmount = (name) => {
        let decreaseQuantity = cart.find(item => item.eventData.item === name)
        if(cart.some(e => e.eventData.item === name)) {
            setquantity(decreaseQuantity.eventData.quantity --)
        }
        return decreaseQuantity.eventData.quantity
    }
    const deleteItem = (name) => {
        setcart(cart => cart.filter(index => index.eventData.item !== name))
        cart.splice(cart.indexOf(name), 1)
        setcart([...cart])
    }
    useEffect(() => {
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    },[cart])
  return (
    <div>
        <div className=" w-96 p-3 m-auto min-h-screen bg-white border-t-2 border-yellow-400">
            <p className=" text-3xl font-bold mb-4">Your Cart</p>
            {
                cart.length === 0 ? <p>Cart is empty</p> : 
                TestComponent(cart)
            }
        </div>
    </div>
  )
}
