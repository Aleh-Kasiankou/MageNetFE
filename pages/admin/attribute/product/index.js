import Layout from "../../../../components/Backend/Layout";
import styles from "../../../../styles/Backend/attribute/attribute-grid.module.css"
import {Trash} from "phosphor-react";
import Link from "next/link";

export default function Index() {

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
                <tr>
                    <td>fkds-398fd-FDDF-153</td>
                    <td>SKU</td>
                    <td>Text</td>
                    <td>
                        <div className={styles.attributeGridActions}></div>
                        <Trash size={iconSize} color={iconColor}/></td>
                </tr>
                <tr>
                    <td>fkds-398fd-FDDF-153</td>
                    <td>SKU</td>
                    <td>Text</td>
                    <td>
                        <div className={styles.attributeGridActions}></div>
                        <Trash size={iconSize} color={iconColor}/></td>
                </tr>
                <tr>
                    <td>fkds-398fd-FDDF-153</td>
                    <td>SKU</td>
                    <td>Text</td>
                    <td>
                        <div className={styles.attributeGridActions}></div>
                        <Trash size={iconSize} color={iconColor}/></td>
                </tr>
                <tr>
                    <td>fkds-398fd-FDDF-153</td>
                    <td>SKU</td>
                    <td>Text</td>
                    <td>
                        <div className={styles.attributeGridActions}></div>
                        <Trash size={iconSize} color={iconColor}/></td>
                </tr>
                <tr>
                    <td>fkds-398fd-FDDF-153</td>
                    <td>SKU</td>
                    <td>Text</td>
                    <td>
                        <div className={styles.attributeGridActions}></div>
                        <Trash size={iconSize} color={iconColor}/></td>
                </tr>
                <tr>
                    <td>fkds-398fd-FDDF-153</td>
                    <td>SKU</td>
                    <td>Text</td>
                    <td>
                        <div className={styles.attributeGridActions}></div>
                        <Trash size={iconSize} color={iconColor}/></td>
                </tr>
                <tr>
                    <td>fkds-398fd-FDDF-153</td>
                    <td>SKU</td>
                    <td>Text</td>
                    <td>
                        <div className={styles.attributeGridActions}></div>
                        <Trash size={iconSize} color={iconColor}/></td>
                </tr>
                <tr>
                    <td>fkds-398fd-FDDF-153</td>
                    <td>SKU</td>
                    <td>Text</td>
                    <td>
                        <div className={styles.attributeGridActions}></div>
                        <Trash size={iconSize} color={iconColor}/></td>
                </tr>
                <tr>
                    <td>fkds-398fd-FDDF-153</td>
                    <td>SKU</td>
                    <td>Text</td>
                    <td>
                        <div className={styles.attributeGridActions}></div>
                        <Trash size={iconSize} color={iconColor}/></td>
                </tr>
                <tr>
                    <td>fkds-398fd-FDDF-153</td>
                    <td>SKU</td>
                    <td>Text</td>
                    <td>
                        <div className={styles.attributeGridActions}></div>
                        <Trash size={iconSize} color={iconColor}/></td>
                </tr>
                <tr>
                    <td>fkds-398fd-FDDF-153</td>
                    <td>SKU</td>
                    <td>Text</td>
                    <td>
                        <div className={styles.attributeGridActions}></div>
                        <Trash size={iconSize} color={iconColor}/></td>
                </tr>

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