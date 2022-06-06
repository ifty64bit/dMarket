import { useState } from 'react'
import Input from '../Input'
import axios from 'axios'
import { AiFillPlusCircle } from 'react-icons/ai';
import { BsXCircleFill } from 'react-icons/bs';

function AddProduct({account, setModal}) {

    const [list, setList] = useState([""]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [file, setFile] = useState(null);
    
    //const { REACT_APP_API_URL } = process.env;

    const updateList = (e) => {
        let items = list;
        let index = e.target.getAttribute('index');
        items[index] = e.target.value;
        setList(items);
    }

    const addList = () => {  
        if (list.at(-1) === "")
        {
            return;
        }
        else {
            setList(preArr=>[...preArr, ""]);
        }
    }

    const clearAll = () => {
        setList([""]);
        setName("")
        setPrice("");
        setFile(null);
        setModal();
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('account', account[0]);
        data.append('photo', file)
        data.append('name', name);
        data.append('price', price);
        data.append('list', JSON.stringify(list));
        axios.post(`http://localhost:8080/productUpload`, data)
            .then((res) => {
                console.log(res);
                if (res.data === "Uploaded") {
                    clearAll();
                    setModal();
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center backdrop-filter backdrop-blur-md'>
            <div className='w-4/5 h-4/5 bg-purple-500 rounded-md text-white'>
                <div className='mt-4 mr-4'><BsXCircleFill className='ml-auto w-6 h-6 cursor-pointer' onClick={ clearAll }/></div>
                <div className='w-full h-full flex items-center'>
                    <form className='w-1/2 mx-auto' onSubmit={ onSubmit }>
                        <div className=' flex justify-between items-center space-x-4'>
                            <div className='flex flex-col'>
                                <Input update={ setName }>Product Name</Input>
                                Details
                                <ol className='list-decimal space-y-2'>
                                    { list.map((l, index) => (
                                        <li key={index} ><Input index={index} updateList={updateList} /></li>
                                    )) }
                                </ol>
                                <span onClick={ addList } className=' cursor-pointer' ><AiFillPlusCircle className='w-6 h-6 my-2' /></span>
                                <Input update={ setPrice }>Price</Input>
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">Upload Photo</label>
                                <input type="file" name="photo" onChange={(e) => setFile(e.target.files[0]) } />   
                            </div>
                        </div>
                        <input className="text-white bg-black px-4 py-2 my-2 rounded-full" type="submit" value="Add File" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct
