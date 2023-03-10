import React, {useState} from "react";
import styles from "../../../styles/Backend/attribute/options-builder.module.css"

export default function OptionsBuilder(props) {

    const selectableOptions = props.selectableOptions?.map((option) => {
        return {
            id: option.optionId,
            val: option.value,
            isDefault: option.isDefaultValue
        }
    })

    const [optionsList, setOptionsList] = useState(selectableOptions ?? [{
        id: null,
        val: "",
        isDefault: false,
        isToDelete: false
    }])

    const addOptionHandler = () => {


        if (optionsList[optionsList.length - 1].val !== "") {
            setOptionsList(prevState => {
                const newOptionsList = prevState.slice()
                newOptionsList.push({id: null, val: "", isDefault: false})
                return newOptionsList
            })
        }
    }

    const deleteOptionHandler = (event) => {

        setOptionsList(prevState => {

                if (prevState.length > 1) {
                    const newOptionsList = prevState.slice()
                    const elementToDelete = newOptionsList[event.target.getAttribute('data-index')]
                    if (elementToDelete.id === null) {
                        newOptionsList.splice(event.target.getAttribute('data-index'), 1)
                    } else {
                        elementToDelete.isToDelete = true
                    }

                    return newOptionsList
                } else {
                    return prevState
                }
            }
        )
    }

    const valueChangeHandler = (event) => {


        setOptionsList(prevState => {
            const newOptionsList = prevState.slice()
            newOptionsList[event.target.getAttribute('data-index')].val = event.target.value;
            return newOptionsList;

        })
    }

    const defaultChangeHandler = (event) => {

        setOptionsList(prevState => {
                const newOptionsList = prevState.slice()
                newOptionsList[event.target.getAttribute('data-index')]
                    .isDefault = event.target.checked

                return newOptionsList;
            }
        )
    }

    props.selectableOptionsUpdater(optionsList);

    return (
        <>
            <div className={props.fullWidthClass + " " + styles.optionsGrid}>
                {

                    optionsList.map((x, index) => {
                            if (!x.isToDelete) {
                                return (
                                    <React.Fragment key={x.id + "-fragment"}>

                                        <label>Option {index + 1}:</label>
                                        <input name={'selectableOptions' + index} type={"text"} data-index={index}
                                               value={x.val}
                                               onChange={valueChangeHandler}></input>

                                        <div className={styles.isDefault}>
                                            <label>Default:</label>
                                            <input defaultChecked={x.isDefault} type={"checkbox"} data-index={index}
                                                   onClick={defaultChangeHandler}/>
                                        </div>

                                        <button type={"button"} data-index={index}
                                                onClick={deleteOptionHandler}>Delete
                                        </button>
                                    </React.Fragment>)
                            }
                        }
                    )
                }

                <button type={"button"} className={props.fullWidthClass} onClick={addOptionHandler}>Add Another
                    Option
                </button>
            </div>
        </>
    )
}