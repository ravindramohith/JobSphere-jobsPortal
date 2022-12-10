import React, { useState, useContext, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import AuthContext from '../../context/AuthContext'
import { toast } from 'react-toastify'

const UpdateProfile = ({ access_token }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const router = useRouter()
    const { update, loading, error, user, clearErrors, UpdateUser, setUpdate } = useContext(AuthContext)

    useEffect(() => {
        if (user) {
            setEmail(user.email)
            setFirstname(user.first_name)
            setLastname(user.last_name)
            setPassword(user.password)
        }
        if (error) {
            toast.error(error)
            clearErrors();
        }
        if (update) {
            setUpdate(false)
            router.push('/me')
            toast.success("Profile updated successfully")
        }

    }, [error, user, update]);


    const submitHandler = (e) => {
        e.preventDefault()
        UpdateUser({ firstname, lastname, email, password }, access_token)
    }



    return (
        <div className="modalMask">
            <div className="modalWrapper">
                <div className="left">
                    <div style={{ width: "100%", height: "100%", position: "relative" }}>
                        <Image src="/images/profile.svg" alt="register" layout='fill' />
                    </div>
                </div>
                <div className="right">
                    <div className="rightContentWrapper">
                        <div className="headerWrapper">
                            <h2>Profile</h2>
                        </div>
                        <form className="form" onSubmit={submitHandler}>
                            <div className="inputWrapper">
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-user"></i>
                                    <input type="text" placeholder="Enter First Name"
                                        value={firstname}
                                        onChange={e => setFirstname(e.target.value)}
                                        required />
                                </div>

                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-user-tie"></i>
                                    <input type="text" placeholder="Enter Last name"
                                        value={lastname}
                                        onChange={e => setLastname(e.target.value)}
                                        required />
                                </div>

                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-envelope"></i>
                                    <input type="email"
                                        placeholder="Enter Your Email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        pattern='\S+@\S+\.\S+'
                                        title='Your Email is invalid'
                                        required
                                    />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-key"></i>
                                    <input
                                        type="password"
                                        placeholder="Enter Your Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        minLeng th={6}
                                    />
                                </div>
                            </div>
                            <div className="registerButtonWrapper">
                                <button type="submit" className="registerButton">
                                    {loading ? 'Updating...' : 'Update'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile