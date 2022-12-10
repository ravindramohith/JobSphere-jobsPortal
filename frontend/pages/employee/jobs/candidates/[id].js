import Layout from '../../../../components/layout/Layout'
import NotFound from '../../../../components/layout/NotFound'
import axios from 'axios'
import JobCandidates from '../../../../components/job/JobCandidates'
import { IsAuthenticatedUser } from '../../../../utils/IsAuthenticated'

export default function JobCandidatesPage({ jobName, candidatesApplied, error }) {
    if (error?.includes("Not found")) { return (<NotFound />); }
    return (
        <Layout title={`${jobName} | Candidates`}>
            <JobCandidates candidatesApplied={candidatesApplied} jobName={jobName} />
        </Layout>
    )
}

export async function getServerSideProps({ req, params }) {
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
    try {
        const res = await axios.get(`${process.env.API_URL}/api/jobs/${params.id}/getUsers`, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        const candidatesApplied = res.data.data
        const jobName = res.data.name
        return {
            props: {
                jobName, candidatesApplied
            }
        }
    } catch (error) {
        return {
            props: {
                error: error.response.data.detail,
            }
        }
    }
}