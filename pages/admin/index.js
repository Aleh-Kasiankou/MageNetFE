import Layout from "../../components/Backend/Layout";

export default function Index() {
    return <p>Admin Dashboard</p>
}

Index.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}