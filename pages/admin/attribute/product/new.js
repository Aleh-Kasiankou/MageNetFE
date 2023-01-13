import Layout from "../../../../components/Backend/Layout";
import ApiRouteResolver from "../../../../lib/api-route-resolver";
import AttributeForm from "../../../../components/Backend/attribute/AttributeForm";
import Attribute from "../../../../lib/models/attribute";
import {useRouter} from "next/navigation";


export default function New() {

    const router = useRouter()
    const saveHandler = (requestBody) => {


        fetch(ApiRouteResolver.buildApiUrl('attribute', ''), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => response.json())
            .then((data) => {
                alert("Attribute has been saved with id:" + " " + data)
                router.push("/admin/attribute/product")
            })
            .catch((error) => {
                alert('Error: Saving the attribute has failed. Please try again later.');
            });
    }

    return (
        <AttributeForm attribute={Attribute.Empty("Product")} pageSaveHandler={saveHandler}></AttributeForm>
    )
}

export async function getStaticProps(context) {

    const req = await fetch(ApiRouteResolver.buildApiUrl("meta", "attribute-type"))
    const attributeTypes = await req.json()

    return {
        props: {attributeTypes}, // will be passed to the page component as props
    }
}

New.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}