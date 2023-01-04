export default class Attribute{

    constructor(attributeData) {
        this.attributeId = attributeData.attributeId;
        this.entityId = attributeData.entityId;
        this.attributeName = attributeData.attributeName;
        this.attributeType = attributeData.attributeType;
        this.defaultLiteralValue = attributeData.defaultLiteralValue;
        this.selectableOptions = attributeData.selectableOptions;
        this.isMultipleSelect = attributeData.isMultipleSelect;
    }

    static Empty(entity){

        let entityId = '';

        if(entity.toLowerCase() === "product"){
            entityId = "1D5B9219-9B8C-4996-8A35-51A27FEAA74B"
        }

        else if (entity.toLowerCase() === "quote"){
            entityId = "18F522B6-697D-4C96-AE91-018D3374ED14"

        }

        else if (entity.toLowerCase() === "order"){
            entityId = "DEE22E09-D91C-4037-8AD5-DD4213EFE33F"
        }

        else if (entity.toLowerCase() === "customer"){
            entityId = "122A1127-6AFB-4CC6-976E-148EED423DCD"

        }

        else {
            throw new DOMException("The unsupported entity type")
        }
        return ({
            entityId: entityId, //1D5B9219-9B8C-4996-8A35-51A27FEAA74B - Product
            attributeName: 'New Attribute',
            attributeType: 'Text',
            defaultLiteralValue: '',
            selectableOptions: null,
            isMultipleSelect: null
        })
    }

    entityId;
    attributeName;
    attributeType;
    defaultLiteralValue;
    selectableOptions;
    isMultipleSelect;





}