import ApiRouteResolver from "../../../../lib/api-route-resolver";
import {useRouter} from "next/router";
import Layout from "../../../../components/Backend/Layout";
import AttributeForm from "../../../../components/Backend/attribute/AttributeForm";
import useSWR from "swr";
import React from "react";
import Attribute from "../../../../lib/models/attribute";

export default function AttributePage() {
    const router = useRouter()
    const {guid} = router.query

    const fetcher = async (url) =>
        fetch(url).then(res => res.json())


    const dataSource = ApiRouteResolver.buildApiUrl('attribute', guid)
    const {data, error} = useSWR(dataSource, fetcher)

    const saveHandler = (requestBody) => {

        requestBody['attributeId'] = guid;

        fetch(ApiRouteResolver.buildApiUrl('attribute'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => {
                if (response.ok){
                    alert("Attribute has been saved")
                }

            })
            .catch((error) => {
                alert('Error: Saving the attribute has failed. Please try again later.');
            });
    }

    if (error) return <div>failed to load</div>

    if (!data) return <div>loading...</div>

    return <AttributeForm attribute={new Attribute(data)} pageSaveHandler={saveHandler}></AttributeForm>
}

AttributePage.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}