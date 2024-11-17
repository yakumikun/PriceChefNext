import React from 'react'

type ButtonProps = {
    children: React.ReactNode;
}

const Button = ({ children }: ButtonProps) => {
    return (
        <div>
            <button className='bg-orange-600 text-white px-8 py-4 boder rounded-lg flex items-center font-bold'>
                {children}
            </button>
        </div>
    )
}

export default Button 
