import Layout from "../../../../components/Backend/Layout";
import styles from "../../../../styles/Backend/attribute/attribute-grid.module.css"
import {Trash} from "phosphor-react";
import Link from "next/link";
import ApiRouteResolver from "../../../../lib/api-route-resolver";


export async function getServerSideProps({req, res}) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=30'
    )

    const url = ApiRouteResolver.buildApiUrl('attribute', '');
    const request = await fetch(url)
    const attributes = await request.json()

    return {
        props: {attributes}, // will be passed to the page component as props
    }
}

export default function Index(props) {

    const iconSize = 30;
    const iconColor = '#2a2b2c';

    return (
        <>
            <h1 className={'backend-page-title'}> Product Attributes </h1>
            <div className={styles.attributeGridActionBar}>
                <input className={styles.attributeGridSearch} type={"text"}
                       placeholder={'Search'}/>

                <Link href={'/admin/attribute/product/new'} className={styles.attributeGridNewButtonLink}>
                    Add New
                </Link>
            </div>

            <table className={styles.attributeGrid}>
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {props.attributes.map(x => <tr key={x.attributeId}>
                    <td className={styles.idColumn}>{x.attributeId}</td>
                    <td className={styles.nameColumn}>{x.attributeName}</td>
                    <td className={styles.typeColumn}>{x.attributeType}</td>
                    <td className={styles.actionsColumn}>
                        <div className={styles.attributeGridActions}></div>
                        <Trash size={iconSize} color={iconColor}/>
                    </td>
                </tr>)}
                </tbody>
            </table>
        </>
    )

}

Index.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}