import { useState, useEffect } from 'react'
import axios from 'axios';
import Card from './Card';

function Home() {

    const [data, setData] = useState([]);
    
    useEffect(() => {
        const getData = async () => {
            axios.get("http://localhost:8080/getProducts")
                .then((res) => {
                    console.log(res);
                    setData(res.data);
                })
                .catch((err) => console.log(err));
        }
        getData();
    }, []);

    return (
        <div className="flex">
            {
                data.map((d,index) => {
                    return (
                        <Card key={index} id={index} data={ d }/>
                    )
                })
            }
        </div>
    )
}

export default Home
