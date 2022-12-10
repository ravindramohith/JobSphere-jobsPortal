import Link from 'next/link'
import React, { useContext } from 'react'
import moment from 'moment'
import { BiRupee } from 'react-icons/bi'

const JobItem = ({ job }) => {
    return (
        <Link href={`/job/${job.id}`}>
            <a className="job-listing">
                <div className="job-listing-details">
                    <div className="job-listing-description">
                        <h4 className="job-listing-company">{job.company}</h4>
                        <h3 className="job-listing-title">{job.title}</h3>
                        <p className="job-listing-text">
                            {job.description.substring(0, 200)}...
                        </p>
                    </div>

                    <span className="bookmark-icon"></span>
                </div>

                <div className="job-listing-footer">
                    <ul>
                        <li>
                            <i aria-hidden className="fas fa-industry"></i>{job.industry}
                        </li>

                        <li>
                            <i aria-hidden className="fas fa-briefcase"></i>{job.jobType}
                        </li>
                        <li>
                            <i aria-hidden className="fas fa-money-check-alt"></i><BiRupee />{job.salary}
                        </li>
                        <li>
                            <i aria-hidden className="far fa-clock"></i> Posted&nbsp;{moment.utc(job.createdAt).local().startOf('seconds').fromNow()}
                        </li>
                    </ul>
                </div>
            </a>
        </Link>)
}

export default JobItem