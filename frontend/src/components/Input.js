import React from 'react'

function Input({ children, updateList, index, update}) {
    return (
        <div className='flex flex-col space-y-1'>
            { children && <label>{ children}</label> }
            <input className='h-8 rounded numb text-black' type="text" onChange={updateList? updateList: (e)=>update(e.target.value)} index={ index }/>
        </div>
    )
}

export default Input
