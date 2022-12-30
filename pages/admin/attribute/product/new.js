import Layout from "../../../../components/Backend/Layout";
import styles from "../../../../styles/Backend/attribute/attribute-new.module.css"
import ApiRouteResolver from "../../../../lib/api-route-resolver";
import React, {useState} from "react";
import OptionsBuilder from "../../../../components/Backend/OptionsBuilder";

export default function New(props) {

    const [selectValue, setSelectValue] = useState(props.attributeTypes[0]);
    let selectableOptions = [];

    const selectableOptionsUpdateHandler = (listOfOptions) => {
        selectableOptions = listOfOptions;
    }


    const selectHandler = (event) => {
        setSelectValue(event.target.value)
    }

    const saveHandler = (event) => {
        event.preventDefault();
        const data = new FormData(event.target)
        const dataObject = Object.fromEntries(data.entries())

        const dataKeys = Object.keys(dataObject)

        const apiRequest = {}


        for (const i of dataKeys) {
            if (i === 'isMultipleSelect'){
                apiRequest[i] = dataObject[i] === "true"
            }

            else if (!i.startsWith('selectableOptions')) {
                apiRequest[i] = dataObject[i]

            }

        }

        if (dataObject.attributeType == "Selectable") {
            selectableOptions = selectableOptions.map((x) => {
                return {value: x.val, isDefaultValue: x.isDefault}
            })
            apiRequest['selectableOptions'] = selectableOptions
        }

        fetch(ApiRouteResolver.buildApiUrl('attribute', ''), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiRequest),
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data);
            })
            .catch((error) => {
                alert('Error:', error);
            });
    }

    return (
        <>
            <h1 className={'backend-page-title'}>New Attribute</h1>
            <form onSubmit={saveHandler} className={styles.attributeForm}>
                <input type={"hidden"} name={'entityId'} value={'1D5B9219-9B8C-4996-8A35-51A27FEAA74B'}></input>
                <label>Attribute Name:</label>
                <input type={'text'} name={'attributeName'}></input>
                <label>Attribute Type:</label>
                <select name={'attributeType'} value={selectValue} onChange={selectHandler}>
                    {props.attributeTypes.map(x => <option key={props.attributeTypes.indexOf(x)}
                                                           value={x}>{x}</option>)}
                </select>
                {selectValue !== "Selectable" &&
                    <>
                        <label>Default Value:</label>
                        <input name={'defaultLiteralValue'} type={selectValue === "Text" ? "text" : "number"}
                               step={0.000001}/>
                    </>
                }

                {selectValue === "Selectable" &&
                    <>
                        <label>Multiple Select: </label>
                        <select name={'isMultipleSelect'}>
                            <option value={true}>No</option>
                            <option value={false}>Yes</option>
                        </select>
                        <OptionsBuilder fullWidthClass={styles.gridFullWidth}
                                        selectableOptionsUpdater={selectableOptionsUpdateHandler}></OptionsBuilder>
                    </>
                }


                <button type={"submit"} className={styles.attributeFormSubmitButton}>Save</button>
            </form>
        </>
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