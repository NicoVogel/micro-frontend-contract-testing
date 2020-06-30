import {
  CustomElementsRecording,
  CustomElementsRecordings,
  EmittedEvent
} from "./models";

const setupCustomElementAttributes = (element: HTMLElement,
  elementInstance: CustomElementsRecording) => {
  for (const attributeName in elementInstance.structures) {
    if (Object.prototype.hasOwnProperty.call(elementInstance.structures, 
      attributeName)) {
      const attributeValue = elementInstance.structures[attributeName];
      element.setAttribute(attributeName, attributeValue);
    }
  }
};

const setupCustomElementEvents = (element: HTMLElement) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const emit = element.dispatchEvent;
  const emitedEvents: EmittedEvent[] = [];
  
  // origin: https://gist.github.com/cScarlson/875a9fca7ab7084bb608fb66adff0463
  const proxy = (event: CustomEvent)=> {
    emitedEvents.push({type:event.type, detail:event.detail});
    return emit.call(element, event);
  };
  element.dispatchEvent = proxy;
};

const setupCustomElement = 
(recording: CustomElementsRecording[], name: string) => {
  for (const elementInstance of recording) {
    const element = document.createElement(name); 
    
    setupCustomElementAttributes(element, elementInstance);
    setupCustomElementEvents(element);
    



    document.body.appendChild(element);
  }
};


const setupAllCustomElements = (recordings: CustomElementsRecordings) => {
  for (const customElementName in recordings) {
    if (Object.prototype.hasOwnProperty.call(recordings, customElementName)) {
      const customElementRecording = recordings[customElementName];
      customElements.whenDefined(customElementName)
        .then(()=>{
          setupCustomElement(customElementRecording, customElementName);
        });
      
    }
  }
};


export const initProducerMock = (recordings: CustomElementsRecordings) => {
  document.addEventListener("DOMContentLoaded", () => {
    setupAllCustomElements(recordings);
  });
};