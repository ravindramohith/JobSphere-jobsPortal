import React from "react";

import Link from "next/link";
import DataTable from "react-data-table-component";

const JobsApplied = ({ jobs }) => {
    const columns = [
        {
            name: "Job name",
            sortable: true,
            selector: (row) => row.title,
        },
        {
            name: "Salary",
            sortable: true,
            selector: (row) => row.salary,
        },
        {
            name: "Education",
            sortable: true,
            selector: (row) => row.education,
        },
        {
            name: "Experience",
            sortable: true,
            selector: (row) => row.experience,
        },
        {
            name: "Applied On",
            sortable: true,
            selector: (row) => row.appliedOn,
        },
        {
            name: "Action",
            sortable: true,
            selector: (row) => row.action,
        },
    ];

    const data = [];

    jobs &&
        jobs.forEach((item) => {
            data.push({
                title: item.job.title,
                salary: item.job.salary,
                education: item.job.education,
                experience: item.job.experience,
                appliedOn: item.appliedAt.substring(0, 10),
                action: (
                    <Link href={`/job/${item.job.id}`}>
                        <a className="btn btn-info">
                            <i aria-hidden className="fa fa-info-circle"></i>
                        </a>
                    </Link>
                ),
            });
        });

    return (
        <div className="row">
            <div className="col-12 mt-5">
                <h4 className="my-5">Jobs Applied</h4>
                <DataTable columns={columns} data={data} pagination responsive />
            </div>
        </div>
    );
};

export default JobsApplied;