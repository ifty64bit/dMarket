import { useState, useEffect } from 'react'
import axios from 'axios';
import Card from '../Card';
import Button from '../Button'
import AddProduct from './AddProduct';

function Admin({ account }) {
    
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);

    const setModal = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const getData = async () => {
            axios.get(`http://localhost:8080/getUserProducts/${account}`)
                .then((res) => {
                    console.log(res);
                    setData([...res.data]);
                })
                .catch((err) => console.log(err));
        }
        getData();
    }, [account]);

    return (
        <>
            <div className='flex justify-center items-center flex-col'>
                <div>{data.map((d, index) => (
                    <Card key={index} data={ d }/>
                ))}</div>
                <div className=''>
                    <Button onClick={ setModal } >Add A Product</Button>
                </div>
            </div>
            {isOpen && <AddProduct setModal={setModal} account={ account } /> }
        </>
    )
}

export default Admin
