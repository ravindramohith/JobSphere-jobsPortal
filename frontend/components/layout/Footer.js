import React from 'react'
import Link from 'next/link'
import { AiFillCopyrightCircle } from 'react-icons/ai'

const Footer = () => {
    return (
        <footer className="py-1">
            <p className="text-center mt-1">
                Jobbie - 2022-2023, All Rights Reserved 
                |
                CopyRight <AiFillCopyrightCircle /> by Ravindra Mohith
            </p>
        </footer>

    )
}

export default Footer