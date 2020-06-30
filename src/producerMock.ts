import { getDefinedCustomElements } from "./helper";
import {
  CustomElementsRecording,
  CustomElementsRecordings,
  EmittedEvent,
  EmittedEvents
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
  return emitedEvents;
};

const setupCustomElement = 
(recording: CustomElementsRecording[], name: string) => {
  const emittedEvents: EmittedEvent[][] = [];
  for (const elementInstance of recording) {
    const element = document.createElement(name); 
    
    setupCustomElementAttributes(element, elementInstance);
    emittedEvents.push(setupCustomElementEvents(element));



    document.body.appendChild(element);
  }
  return emittedEvents;
};


const getCustomElementsTagsFromRecording = 
(recordings: CustomElementsRecordings) =>{
  const tags = new Set<string>();
  for (const customElementName in recordings) {
    if (Object.prototype.hasOwnProperty.call(recordings, customElementName)) {
      tags.add(customElementName);
    }
  }
  return tags;
};



const setupAllCustomElements = async (recordings: CustomElementsRecordings) => {

  const uniqueTags = getCustomElementsTagsFromRecording(recordings);
  const definedTags = await getDefinedCustomElements(uniqueTags);
  const emittedEventsRecording: EmittedEvents = {};

  for (const customElementName in recordings) {
    if (Object.prototype.hasOwnProperty.call(recordings, customElementName) &&
        definedTags.includes(customElementName)) {
      const customElementRecording = recordings[customElementName];

      customElements.whenDefined(customElementName)
        .then(()=>{
          emittedEventsRecording[customElementName] = 
          setupCustomElement(customElementRecording, customElementName);
        });
    }
  }
  return emittedEventsRecording;
};


export const initProducerMock = (recordings: CustomElementsRecordings) => {
  document.addEventListener("DOMContentLoaded", () => {
    setupAllCustomElements(recordings);
  });
};