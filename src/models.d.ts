export interface AttributeStructure {
  [attributeName: string]: string;
}
export interface AttributeChange {
  attributeName: string;
  newValue: string;
}

export interface CustomElementsRecording {
  structures: AttributeStructure;
  attributeChanges: AttributeChange[];
  eventListeners: Set<string>;
}

export interface CustomElementsRecordings {
  [customElementName: string]: CustomElementsRecording[];
}

export interface EmittedEvent {
  type: string;
  detail: unknown;
}

export interface EmittedEvents{
  [customElementName: string]: EmittedEvent[][];
}