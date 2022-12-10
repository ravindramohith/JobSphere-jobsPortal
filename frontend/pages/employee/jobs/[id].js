import Layout from "../../../components/layout/Layout";
import NotFound from "../../../components/layout/NotFound";
import UpdateJob from "../../../components/job/UpdateJob";

import { IsAuthenticatedUser } from "../../../utils/isAuthenticated";
import axios from "axios";

export default function UpdateJobPage({ job, access_token, error }) {
    if (error?.includes("Not found")) return <NotFound />;

    return (
        <Layout title={`Jobbie | Update Job - ${job.title}`}>
            <UpdateJob job={job} access_token={access_token} />
        </Layout>
    );
}

export async function getServerSideProps({ req, params }) {
    const access_token = req.cookies.access;

    const user = await IsAuthenticatedUser(access_token);

    if (!user) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    try {
        const res = await axios.get(
            `${process.env.API_URL}/api/job/${params.id}`
        );

        const job = res.data.job;

        return {
            props: {
                job,
                access_token,
            },
        };
    } catch (error) {
        return {
            props: {
                error: error.response.data.detail,
            },
        };
    }
}