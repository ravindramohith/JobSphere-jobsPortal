import React, { useEffect, useState } from 'react'
import Link from "next/link";
import DataTable from "react-data-table-component";
import moment from 'moment';

const JobCandidates = ({ jobName, candidatesApplied }) => {
    const columns = [
        {
            name: "ID",
            sortable: true,
            selector: (row) => row.id,
        },
        {
            name: "Candidate Name",
            sortable: true,
            selector: (row) => row.name,
        },
        {
            name: "Candidate Email",
            sortable: true,
            selector: (row) => row.email,
        },
        {
            name: "Salary",
            sortable: true,
            selector: (row) => row.salary,
        },
        {
            name: "Candidate Resume",
            sortable: true,
            selector: (row) => row.resume,
        },
        {
            name: "Applied On",
            sortable: true,
            selector: (row) => row.appliedOn,
        },
    ];

    const data = [];

    candidatesApplied &&
        candidatesApplied.forEach((application) => {
            data.push({
                id: application.user.id,
                email: application.user.email,
                name: application.user.first_name,
                salary: application.salary,
                appliedOn: application.appliedAt.substring(0, 10),
                resume: (<Link href={`https://jobbieapi.s3.ap-south-1.amazonaws.com/${application.resume}`}>
                    <a
                        className="text-primary text-center ml-4"
                        rel="noreferrer"
                        target="_blank"
                    >
                        <b>
                            <i aria-hidden className="fas fa-eye"></i>View Resume
                        </b>
                    </a>
                </Link>)
            });
        });
    return (
        <div className="row">
            <div className="col-2"></div>
            <div className="col-8 mt-5">
                <h4 className="my-5">{candidatesApplied && `Applied Candidates For ${jobName}`}</h4>
                <h6 className="my-5">{candidatesApplied && `${candidatesApplied.length} candidates applied for this job`}</h6>
                <DataTable columns={columns} data={data} pagination responsive />
            </div>
            <div className="col-2"></div>
        </div>
    );
};


export default JobCandidates