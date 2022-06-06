import React from 'react'

function Header({account}) {
    return (
        <div className="flex py-6 bg-black text-white shadow-md justify-center items-center relative px-4">
            <h1 className="text-bold text-4xl">dMarket</h1>
            <div className="absolute right-4"><h3>{ account }</h3></div>
        </div>
    )
}

export default Header
