import Layout from "../../components/layout/Layout";
import UpdateProfile from "../../components/user/UpdateProfile";
import { IsAuthenticatedUser } from "../../utils/IsAuthenticated";

export default function UpdateProfilePage({access_token}) {
    return (
        <Layout title="Jobbie | Update Your Profile">
            <UpdateProfile access_token={access_token}/>
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

    return {
        props: {
            access_token
        }
    }
}