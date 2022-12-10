import axios from 'axios';
import { useState, useEffect, createContext } from 'react';
import Router, { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [error, setError] = useState(null)
    const [update, setUpdate] = useState(false)
    const [uploaded, setUploaded] = useState(false)

    const router = useRouter()
    useEffect(() => {
        if (!user) { loadUser() }
    }, [user])
    const login = async ({ username, password }) => {
        try {
            setLoading(true)
            const res = await axios.post('api/auth/login', {
                username,
                password
            })

            if (res.data.success) {
                loadUser();
                setIsAuthenticated(true)
                setLoading(false)
                router.push('/')
            } else {
                const res = await axios.post('upload/api/auth/login', {
                    username,
                    password
                })

                if (res.data.success) {
                    loadUser();
                    setIsAuthenticated(true)
                    setLoading(false)
                    router.push('/')
                }
            }
        } catch (e) {
            setLoading(false)
            setError(e.response && (e.response.data.detail || e.response.data.error))
        }
    }
    const register = async ({ firstname, lastname, email, password }) => {
        try {
            setLoading(true)
            const res = await axios.post(`${process.env.API_URL}/api/register/`, {
                first_name: firstname,
                last_name: lastname,
                email,
                password
            })

            if (res.data.message) {
                setLoading(false)
                router.push('/login')
            }
        } catch (e) {
            console.log(e)
            setLoading(false)
            setError(e.response && (e.response.data.detail || e.response.data.error))
        }
    }
    const UpdateUser = async ({ firstname, lastname, email, password }, access_token) => {
        try {
            setLoading(true)
            const res = await axios.put(`${process.env.API_URL}/api/update/me/`, {
                first_name: firstname,
                last_name: lastname,
                email,
                password
            }, {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            })

            if (res.data) {
                setLoading(false)
                setUpdate(true)
                setUser(res.data)
            }
        } catch (e) {
            console.log(e)
            setLoading(false)
            setError(e.response && (e.response.data.detail || e.response.data.error))
        }
    }

    const uploadResume = async (formData, access_token) => {
        try {
            setLoading(true)
            const res = await axios.put(`${process.env.API_URL}/api/upload/resume/`,
                formData
                , {
                    headers: {
                        "Authorization": `Bearer ${access_token}`,
                    }
                })

            if (res.data) {
                setLoading(false)
                setUploaded(true)
                setUser(res.data)
            }
        } catch (e) {
            console.log(e)
            setLoading(false)
            setError(e.response && (e.response.data.detail || e.response.data.error))
        }
    }

    const loadUser = async () => {
        try {
            setLoading(true)
            const res = await axios.get('/api/auth/user')
            if (res.data.success) {
                setIsAuthenticated(true)
                setLoading(false)
                setUser(res.data.user)
            }
        } catch (e) {
            setLoading(false)
            setIsAuthenticated(false)
            setUser(null)
            setError(e.response && (e.response.data.detail || e.response.data.error))
        }
    }
    const logout = async () => {
        try {
            setLoading(true)
            const res = await axios.post('api/auth/logout')
            if (res.data.success) {
                setIsAuthenticated(false)
                setUser(null)
            }
        } catch (e) {
            setLoading(false)
            setIsAuthenticated(false)
            setUser(null)
            setError(e.response && (e.response.data.detail || e.response.data.error))
        }
    }
    const clearErrors = () => {
        setError(null)
    }

    return (
        <AuthContext.Provider
            value={{
                loading,
                user,
                error,
                isAuthenticated,
                update,
                uploaded,
                login,
                register,
                UpdateUser,
                logout,
                setUpdate,
                uploadResume,
                setUploaded,
                clearErrors
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;