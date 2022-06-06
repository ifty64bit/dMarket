import React from 'react'
import Button from './Button'
import { Link } from "react-router-dom";

function Card({ data }) {
    return (
        <div className=" w-40 p-4 m-2 rounded shadow-xl">
            <div>
                <img src={`${data.img_name}`} alt="product" />
            </div>
            <div className="text-center mt-4">
                <h2 className="font-bold text-xl">{data.p_name}</h2>
                <p>Price: { data.price}</p>    
            </div>
            <div className="mt-2">
                <Link to={`/product/${data.id}`}><Button>View Details</Button></Link>
            </div>
        </div>
    )
}

export default Card
