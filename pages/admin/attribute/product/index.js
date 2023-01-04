import Layout from "../../../../components/Backend/Layout";
import styles from "../../../../styles/Backend/attribute/attribute-grid.module.css"
import {Trash} from "phosphor-react";
import Link from "next/link";
import ApiRouteResolver from "../../../../lib/api-route-resolver";
import {useState} from "react";


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

    const [attributes, setAttributes] = useState([...props.attributes]);

    const deleteAttributeHandler = (event) => {
        const attributeId = event.target.getAttribute('data-key');
        const endpoint = ApiRouteResolver.buildApiUrl('attribute', attributeId)
        fetch(endpoint, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.status === 204) {
                    alert("Attribute is deleted")

                    setAttributes(prevState => {
                        const newAttributes = prevState.slice()
                        for (const attr of newAttributes) {
                            if (attributeId === attr.attributeId) {
                                newAttributes.splice(newAttributes.indexOf(attr), 1)
                                break;
                            }
                        }

                        return newAttributes;
                    })
                }
            })
            .catch(error => {
                alert(error)
            });


    }

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
                {attributes.map(x => <tr key={x.attributeId}>
                    <td className={styles.idColumn}><Link href={'./product/' + x.attributeId}>{x.attributeId}</Link></td>
                    <td className={styles.nameColumn}><Link href={'./product/' + x.attributeId}>{x.attributeName}</Link></td>
                    <td className={styles.typeColumn}><Link href={'./product/' + x.attributeId}>{x.attributeType}</Link></td>
                    <td className={styles.actionsColumn}>
                        <div className={styles.attributeGridActions}></div>
                        <Trash onClick={deleteAttributeHandler} size={iconSize} data-key={x.attributeId}
                               color={iconColor}/>
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