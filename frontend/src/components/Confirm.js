import { useState } from 'react'
import Button from './Button'

function Confirm({ confirm }) {
    const [input, setInput] = useState("");
    return (
        <div className="flex justify-center items-center h-96">
            <div className="flex flex-col">
                <label>Enter Order ID</label>
                <input className="mb-4 outline-none border-black border-2 rounded px-2" type="text" value={ input } onChange={ (e)=>setInput(e.target.value) }/>
                <Button onClick={confirm} product={input}>Confirm</Button>
            </div>
        </div>
    )
}

export default Confirm
