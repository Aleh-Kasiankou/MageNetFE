import Layout from "../../../../components/Backend/Layout";
import styles from "../../../../styles/Backend/attribute/attribute-new.module.css"

export default function New() {
    return (
        <>
            <h1 className={'backend-page-title'}>New Attribute</h1>
            <form className={styles.attributeForm}>
                <label>Attribute Name:</label>
                <input type={'text'}></input>
                <label>Attribute Type:</label>
                <select>
                    <option value="text">Text</option>
                    <option value="price">Price</option>
                    <option value="selectable">Selectable</option>
                </select>
                <button type={"submit"} className={styles.attributeFormSubmitButton}>Save</button>
            </form>
        </>
    )
}

New.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}