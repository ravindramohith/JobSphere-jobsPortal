import axios from 'axios';
import { useState, useEffect, createContext } from 'react';
import Router, { useRouter } from 'next/router';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [updated, setUpdated] = useState(false)
    const [applied, setApplied] = useState(false)
    const [stats, setStats] = useState(false)
    const [created, setCreated] = useState(false)
    const [deleted, setDeleted] = useState(false)

    const router = useRouter()
    const clearErrors = () => {
        setError(null)
    }

    const newJob = async (data, access_token) => {
        try {
            setLoading(true);
            const res = await axios.post(`${process.env.API_URL}/api/createjob`, data, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            console.log(res.data)
            if (res.data) {
                setLoading(false);
                setCreated(true);
            }
        } catch (err) {
            setLoading(false);
            setError(
                err.response && (err.response.data.detail || err.response.data.error || err.response.data.message)
            )
        }
    }
    const updateJob = async (id, data, access_token) => {
        try {
            setLoading(true);
            const res = await axios.put(`${process.env.API_URL}/api/job/${id}/update`, data, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            console.log(res.data)
            if (res.data) {
                setLoading(false);
                setUpdated(true);
            }
        } catch (err) {
            setLoading(false);
            setError(
                err.response && (err.response.data.detail || err.response.data.error || err.response.data.message)
            )
        }
    }
    const deleteJob = async (id, access_token) => {
        try {
            setLoading(true);
            const res = await axios.delete(`${process.env.API_URL}/api/job/${id}/delete`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            console.log(res.data)
            setLoading(false);
            setDeleted(true);
        } catch (err) {
            setLoading(false);
            setError(
                err.response && (err.response.data.detail || err.response.data.error || err.response.data.message)
            )
        }
    }
    const applyToJob = async (id, access_token) => {
        try {
            setLoading(true);
            const res = await axios.post(`${process.env.API_URL}/api/jobs/${id}/apply`, {}, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            if (res.data.applied) {
                setLoading(false);
                setApplied(true);
            }
        } catch (err) {
            setLoading(false);
            setError(
                err.response && (err.response.data.detail || err.response.data.error || err.response.data.message)
            )
        }
    }
    const checkJobApplied = async (id, access_token) => {
        try {
            setLoading(true);

            const res = await axios.get(
                `${process.env.API_URL}/api/jobs/${id}/check`,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );

            setLoading(false);
            setApplied(res.data);
        } catch (error) {
            setLoading(false);
            setError(
                error.response &&
                (error.response.data.detail || error.response.data.error)
            );
        }
    }
    const getTopicStats = async (topic) => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${process.env.API_URL}/api/stats/${topic}`
            );
            setLoading(false);
            setStats(res.data);
        } catch (error) {
            setLoading(false);
            setError(
                error.response &&
                (error.response.data.detail || error.response.data.error)
            );
        }
    }; return (
        <JobContext.Provider
            value={{
                loading,
                error,
                updated,
                applied,
                stats,
                created,
                deleted,
                getTopicStats,
                setUpdated,
                setCreated,
                setDeleted,
                newJob,
                updateJob,
                deleteJob,
                applyToJob,
                checkJobApplied,
                clearErrors
            }}
        >
            {children}
        </JobContext.Provider>
    )
}

export default JobContext;