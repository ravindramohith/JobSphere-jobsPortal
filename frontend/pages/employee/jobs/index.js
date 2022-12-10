import axios from "axios";
import Layout from "../../../components/layout/Layout";
import MyJobs from "../../../components/job/MyJobs";
import { IsAuthenticatedUser } from "../../../utils/IsAuthenticated";

export default function MyJobsPage({ jobs, access_token }) {
    return (
        <Layout title="Jobbie | My Jobs">
            <MyJobs jobs={jobs} access_token={access_token} />
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
    const res = await axios.get(`${process.env.API_URL}/api/getCurrentUserJobs/`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    const jobs = res.data
    return {
        props: {
            jobs, access_token
        }
    }
}