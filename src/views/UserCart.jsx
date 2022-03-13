import React from 'react'
import { useEffect, useState } from 'react'

export default function UserCart() {
    const [cart, setcart] = useState([])
    const rupiahChecker = (x) => {
        return 'Rp. ' + x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    }
    const cartComponent = (product) => product.map((index) => (
        <div className="flex mb-6" key={index.id}>
            <div className=" flex">
                <div className=" w-16 h-16 bg-gray-500"></div>
                <div className=" my-auto ml-4">
                    <div>
                        <p>{index.item}</p>
                        <p>{rupiahChecker(index.price) }</p>
                    </div>
                </div>
            </div>
            <div className=" text-right flex-grow my-auto">
                1x
            </div>
        </div>
    ))
    useEffect(() => {
        window.addEventListener("message", (event)=>{
            const itemData = event.data
            cart.push(itemData)
        });
    },[cart])
  return (
    <div>
        <div className=" w-96 p-3 m-auto min-h-screen bg-white border-t-2 border-yellow-400">
            <p className=" text-3xl font-bold mb-4">Your Cart</p>
            {
                cart.length === 0 ? <p>Cart is empty</p> : cartComponent(cart)
            }
        </div>
    </div>
  )
}
