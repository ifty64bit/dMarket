import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import Button from './Button';

function Product({button }) {
    let params = useParams();
    const productID = params.id;
    const [product, setProduct] = useState();

    useEffect(() => {
            axios.get(`http://localhost:8080/getProducts/${productID}`)
                .then((res) => {
                    //console.log(res.data[0]);
                    //1console.log(JSON.parse(res.data[0].details));
                    setProduct(res.data[0]);
                })
                .catch((err) => console.log(err));
    },[productID])

    return (
        <>
            {
                product && 
                <div className="px-6 mt-20">
                    <div className="flex justify-center">
                        <div className="px-4 max-w-lg">
                            <img src={`/${product.img_name}`} alt="product" />
                        </div>
                        <div className="px-4 self-center">
                            <div className="font-bold text-3xl py-4">{product.p_name}</div>
                            <div>
                                <ul className="list-disc">
                                    {JSON.parse(product.details).map((l,index) => {
                                        return (
                                            <li key={index}>{ l }</li>
                                        )
                                    }) }
                                </ul>
                            </div>
                            <div className="text-2xl my-4 font-bold text-pink-700">
                                <h3>Price: { product.price } ETH</h3>
                            </div>
                            <div className="my-4">
                                <Button onClick={ button } product={ product } value={product.price}>Buy Now</Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Product
