import axios from "axios";
import Layout from "../../components/layout/Layout";
import JobsApplied from "../../components/job/JobApplied";
import { IsAuthenticatedUser } from "../../utils/IsAuthenticated";

export default function JobsAppliedPage({ jobs }) {
    return (
        <Layout title="Jobbie | Jobs Applied">
            <JobsApplied jobs={jobs} />
        </Layout>
    )
}

export async function getServerSideProps({ req }) {
    const access_token = req.cookies.access;
    const user = await IsAuthenticatedUser(access_token)
    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    const res = await axios.get(`${process.env.API_URL}/api/getCurrentUserAppliedJobs/`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    const jobs = res.data
    return {
        props: {
            jobs
        }
    }
}