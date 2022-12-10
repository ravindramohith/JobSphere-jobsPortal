import React, { useEffect, useContext, useState } from 'react'
import moment from 'moment'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import JobContext from '../../context/JobContext';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthContext';
import { RiAdminFill } from 'react-icons/ri'
import { useRouter } from 'next/router';
import { BiRupee } from 'react-icons/bi';

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN

const JobDetails = ({ job, candidates, access_token }) => {
    const [isPosted, setIsPosted] = useState(false);
    const coordinates = job.point.split("(")[1].replace(")", "").split(" ");
    const { checkJobApplied, applyToJob, applied, loading, error, clearErrors } = useContext(JobContext)
    const { user, isAuthenticated } = useContext(AuthContext)

    const router = useRouter();
    useEffect(() => {
        if (isAuthenticated) {
            setIsPosted(user.id === job.user)
        }
    }, [user])

    useEffect(async () => {
        const map = new mapboxgl.Map({
            container: 'job-map', // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: coordinates, // starting position [lng, lat]
            zoom: 10.5, // starting zoom
        });
        new mapboxgl.Marker().setLngLat(coordinates).addTo(map)
        if (!access_token) {
            toast.error("Please Login to Perform actions")
        }
        if (error) {
            toast.error(error);
            clearErrors(error);
        }
        if (access_token) {
            checkJobApplied(job.id, access_token);
        }
    }, [error])

    const applyToJobHandler = () => {
        applyToJob(job.id, access_token)
    }
    const Viewinfo = () => {
        router.push(`/employee/jobs/candidates/${job.id}`)
    }
    const last_date = moment(job.lastDate)
    const now = moment(Date.now())
    const isLastDatePassed = last_date.diff(now, 'days') < 0 ? true : false
    return (
        <div className="job-details-wrapper">
            <div className="container container-fluid">
                <div className="row">
                    <div className="col-xl-9 col-lg-8">
                        <div className="job-details p-3">
                            <div className="job-header p-4">
                                <h2>{job.title}</h2>
                                <span>
                                    <i aria-hidden className="fas fa-building"></i>
                                    <span>{" " + job.company}</span>
                                </span>
                                <span className="ml-4">
                                    <i aria-hidden className="fas fa-map-marker-alt"></i>
                                    <span>{" " + job.address}</span>
                                </span>

                                <div className="mt-3">
                                    <span>
                                        {isPosted ? (<button
                                            disabled
                                            className="btn btn-danger px-4 py-2 apply-btn"
                                        >
                                            <RiAdminFill />{" "}
                                            {loading ? "Loading..." : "Admin"}
                                        </button>) :
                                            (loading ? (
                                                <div className="lds-ellipsis">
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                </div>
                                            ) : applied ? (
                                                <button
                                                    disabled
                                                    className="btn btn-success px-4 py-2 apply-btn"
                                                >
                                                    <i aria-hidden className="fas fa-check"></i>{" "}
                                                    {loading ? "Loading" : "Applied"}
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-primary px-4 py-2 apply-btn"
                                                    onClick={applyToJobHandler}
                                                    disabled={isLastDatePassed}
                                                >
                                                    {isLastDatePassed ? "Job Expired" : (loading ? "Applying..." : "Apply Now")}
                                                </button>
                                            ))}
                                        <span className="ml-4 text-success">
                                            <b>{candidates}</b> candidates has applied to this job.
                                        </span>
                                        {isPosted && (
                                            <>&nbsp;&nbsp;
                                                <button
                                                    className="btn btn-info px-4 py-2 apply-btn"
                                                    onClick={Viewinfo}
                                                >
                                                    View Candidates Info
                                                </button>
                                            </>
                                        )}
                                    </span>
                                </div>
                            </div>

                            <div className="job-description mt-5">
                                <h4>Description</h4>
                                <p>
                                    {job.description}
                                </p>
                            </div>

                            <div className="job-summary">
                                <h4 className="mt-5 mb-4">Job Summary</h4>
                                <table className="table table-striped">
                                    <tbody>
                                        <tr>
                                            <td>Job Type</td>
                                            <td>:</td>
                                            <td>{job.jobType}</td>
                                        </tr>

                                        <tr>
                                            <td>Job Industry</td>
                                            <td>:</td>
                                            <td>{job.industry}</td>
                                        </tr>

                                        <tr>
                                            <td>Expected Salary</td>
                                            <td>:</td>
                                            <td><BiRupee />{job.salary}</td>
                                        </tr>

                                        <tr>
                                            <td>Education</td>
                                            <td>:</td>
                                            <td>{job.education}</td>
                                        </tr>

                                        <tr>
                                            <td>Experience</td>
                                            <td>:</td>
                                            <td>{job.experience}</td>
                                        </tr>

                                        <tr>
                                            <td>Company</td>
                                            <td>:</td>
                                            <td>{job.company}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="job-location">
                                <h4 className="mt-5 mb-4">Job Location</h4>
                                <div id='job-map' style={{ height: 520, width: '100%' }} />
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-4">
                        <div className="job-contact-details p-3">
                            <h4 className="my-4">More Details</h4>
                            <hr />
                            <h5>Email Address:</h5>
                            <p>{job.email}</p>

                            <h5>Job Posted:</h5>
                            <p>{moment.utc(job.createdAt).local().startOf('seconds').fromNow()}</p>

                            <h5>Last Date:</h5>
                            <p>{job.lastDate.substring(0, 10)}</p>
                        </div>
                        {!isPosted && isLastDatePassed && (
                            <div className="mt-5 p-0">
                                <div className="alert alert-danger">
                                    <h5>Note:</h5>
                                    You can no longer apply to this job. This job is expired. Last
                                    date to apply for this job was: <b>{job.lastDate.substring(0, 10)}</b>
                                    <br /> Checkout others job on Jobbie.
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>)
}

export default JobDetails