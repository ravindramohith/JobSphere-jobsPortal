import React, { useContext, useEffect } from 'react'
import Link from "next/link";
import DataTable from "react-data-table-component";
import moment from 'moment';
import JobContext from '../../context/JobContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const MyJobs = ({ jobs, access_token }) => {
    const { loading, error, clearErrors, deleted, setDeleted, deleteJob } = useContext(JobContext);
    const router = useRouter()
    useEffect(() => {
        if (error) {
            toast.error(error)
            clearErrors()
        }
        if (deleted) {
            toast.success("Job deleted successfully")
            router.reload(router.asPath)
        }
    }, [error, deleted])
    const deleteJobHandler = (id) => {
        deleteJob(id, access_token)
    }
    const columns = [
        {
            name: "Job ID",
            sortable: true,
            selector: (row) => row.id,
            width: "8%",
            headerStyle: (selector, id) => {
                return { textAlign: "center" };
            },
        },
        {
            name: "Job name",
            sortable: true,
            width: "20%",
            selector: (row) => row.title,
            headerStyle: (selector, id) => {
                return { textAlign: "center" };
            },
        },
        {
            name: "Salary",
            sortable: true,
            selector: (row) => row.salary,
            width: "15%",
            headerStyle: (selector, id) => {
                return { textAlign: "center" };
            },
        },
        {
            name: "Created On",
            sortable: true,
            width: "15%",
            selector: (row) => row.createdOn,
            headerStyle: (selector, id) => {
                return { textAlign: "center" };
            },
        },
        {
            name: "Last Modified",
            width: "15%",
            sortable: true,
            selector: (row) => row.updatedOn,
            headerStyle: (selector, id) => {
                return { textAlign: "center" };
            },
        },
        {
            name: "Action",
            selector: (row) => row.action,
            headerStyle: (selector, id) => {
                return { textAlign: "center" };
            },
        },
    ];

    const data = [];

    jobs &&
        jobs.forEach((job) => {
            data.push({
                id: job.id,
                title: job.title,
                salary: job.salary,
                createdOn: moment.utc(job.createdAt).local().startOf('seconds').fromNow(),
                updatedOn: moment.utc(job.updatedAt).local().startOf('seconds').fromNow(),
                action: (
                    <>
                        <Link href={`/job/${job.id}`}>
                            <a className="btn btn-info my-2 mx-1">
                                <i aria-hidden className="fa fa-info-circle"></i>
                            </a>
                        </Link>
                        <Link href={`/employee/jobs/candidates/${job.id}`}>
                            <a className="btn btn-success my-2 mx-1">
                                <i aria-hidden className="fa fa-users"></i>
                            </a>
                        </Link>
                        <Link href={`/employee/jobs/${job.id}`}>
                            <a className="btn btn-warning my-2 mx-1">
                                <i aria-hidden className="fa fa-pencil"></i>
                            </a>
                        </Link>
                        <button className='btn btn-danger my-2 mx-1' onClick={() => deleteJobHandler(job.id)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
                ),
            });
        });

    return (
        <div className="row">
            <div className="col-2"></div>
            <div className="col-8 mt-5">
                <h4 className="my-5">Posted Jobs</h4>
                <DataTable columns={columns} data={data} pagination responsive />
            </div>
            <div className="col-2"></div>
        </div>
    );
};


export default MyJobs