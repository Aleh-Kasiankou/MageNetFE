import styles from "../../../styles/Backend/attribute/attribute-new.module.css"
import React, {useEffect, useState} from "react";
import OptionsBuilder from "../../../components/Backend/attribute/OptionsBuilder";
import ApiRouteResolver from "../../../lib/api-route-resolver";

export default function AttributeForm(props) {

    const [attributeTypes, setAttributeTypes] = useState([])


    useEffect(() => {
            if (window.localStorage.getItem('attribute-types') !== null) {
                const data = window.localStorage.getItem('attribute-types');
                data !== null ? setAttributeTypes(JSON.parse(data)) : null;
            } else {
                const getApiAttributeTypes = async () => {
                    try {

                        const response = await fetch(ApiRouteResolver.buildApiUrl("meta", 'attribute-type'));
                        const data = await response.json();
                        localStorage.setItem('attribute-types', JSON.stringify(data));
                        setAttributeTypes(data);
                    } catch
                        (err) {
                        console.log(err);
                    }
                }

                getApiAttributeTypes();
            }
        }
        ,
        []
    )


    const [selectValue, setSelectValue] = useState(props.attribute.attributeType ?? attributeTypes[0]);
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
            console.log(i + " " + dataObject[i])
            if (i === 'isMultipleSelect') {
                apiRequest[i] = dataObject[i] === "true"
            } else if (!i.startsWith('selectableOptions')) {
                apiRequest[i] = dataObject[i]
            }


        }

        if (dataObject.attributeType === "Selectable") {


            selectableOptions = selectableOptions.map((x) => {
                return {optionId: x.id, value: x.val, isDefaultValue: x.isDefault, isToDelete: x.isToDelete}
            })

            apiRequest['selectableOptions'] = selectableOptions
        }

        props.pageSaveHandler(apiRequest)
    }


    return (
        <>
            <h1 className={'backend-page-title'}>Edit Attribute</h1>
            <form onSubmit={saveHandler} className={styles.attributeForm}>
                <input type={"hidden"} name={'entityId'} value={props.attribute.entityId}></input>
                <label>Attribute Name:</label>
                <input type={'text'} name={'attributeName'} defaultValue={props.attribute.attributeName}></input>
                <label>Attribute Type:</label>
                <select name={'attributeType'} value={selectValue} onChange={selectHandler}>
                    {attributeTypes.map(x => <option key={attributeTypes.indexOf(x)}
                                                     value={x}>{x}</option>)}
                </select>
                {selectValue !== "Selectable" &&
                    <>
                        <label>Default Value:</label>
                        <input name={'defaultLiteralValue'} defaultValue={props.attribute.defaultLiteralValue}
                               type={selectValue === "Text" ? "text" : "number"}
                               step={0.000001}/>
                    </>
                }

                {selectValue === "Selectable" &&
                    <>
                        <label>Multiple Select: </label>
                        <select name={'isMultipleSelect'}
                                defaultValue={props.attribute.isMultipleSelect?.toString() ?? 'false'}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                        <OptionsBuilder selectableOptions={props.attribute.selectableOptions}
                                        fullWidthClass={styles.gridFullWidth}
                                        selectableOptionsUpdater={selectableOptionsUpdateHandler}></OptionsBuilder>
                    </>
                }


                <button type={"submit"} className={styles.attributeFormSubmitButton}>Save</button>
            </form>
        </>
    )
}
