export interface AttributeStructure {
    [attributeName: string]: string;
}
export interface AttributeChange {
    attributeName: string;
    newValue: string;
}
export interface CustomElementsRecordings {
    [customElementName: string]: {
        structures: AttributeStructure[];
        attributeChanges: AttributeChange[][];
        eventListeners: Set<string>[];
    };
}