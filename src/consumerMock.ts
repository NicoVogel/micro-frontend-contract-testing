import {
  AttributeChange,
  AttributeStructure, CustomElementsRecording, CustomElementsRecordings
} from "./models";

const getAllElements = () => document.body.getElementsByTagName("*");
const getUniqueCustomElements = (elements: HTMLCollectionOf<Element>) =>
  new Set<string>([]
    .map.call(elements, (el: Element) => el.nodeName.toLowerCase())
    // '-' is a naming requirement to identify custom elements
    .filter((name: string) => name.includes("-")));

const getAllUndefinedCustomElements = async () => {
  const uniqueElements = getUniqueCustomElements(getAllElements());
  const definedElements = [];
  uniqueElements.forEach((value) => {
    customElements.whenDefined(value)
      .then(() => {
        // this is a micro task which is executed after the current task 
        definedElements.push(value);
      });
  });
  return new Promise<string[]>((resolve) => {
    // this queues another micro task which is executed after 
    // all the previously defined micro tasks
    queueMicrotask(() => {
      resolve(Array.from(uniqueElements)
        .filter((value) => !definedElements.includes(value)));
    });
  });
};

const copyAttributes = (element: HTMLElement,
  structure: AttributeStructure) => {

  // getAttributeNames can contain duplicates
  new Set<string>(element.getAttributeNames())
    .forEach((name) => {
      structure[name] = element.getAttribute(name);
    });
};

const observeAnyAttributeChange = (Element: HTMLElement,
  attributeChanges: AttributeChange[]) => {

  // origin: 
  // https://github.com/w3c/webcomponents/issues/565#issuecomment-345556883
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes") {
        const newVal = (mutation.target as HTMLElement)
          .getAttribute(mutation.attributeName);
        attributeChanges.push({
          attributeName: mutation.attributeName, newValue: newVal
        });
      }
    });
  });
  observer.observe(Element, { attributes: true });
};

const getStructureOfUndefinedCustomElements = async () => {
  const undefinedCustomElements = await getAllUndefinedCustomElements();
  const elementRecordings: CustomElementsRecordings = {};

  undefinedCustomElements.forEach((elementName) => {
    const currentElementRecordings = elementRecordings[elementName] = [];

    customElements.define(elementName, class extends HTMLElement {
      constructor() {
        super();
      }
      private eventListener: Set<string>;
      connectedCallback() {
        const instanceRecording: CustomElementsRecording = {
          structures:{},
          attributeChanges: [],
          eventListeners: new Set<string>()
        };
        currentElementRecordings.push(instanceRecording);

        copyAttributes(this, instanceRecording.structures);
        observeAnyAttributeChange(this, instanceRecording.attributeChanges);
        this.eventListener = instanceRecording.eventListeners;
      }
      addEventListener(
        type, listener, options
      ) {
        super.addEventListener(
          type, listener, options
        );
        this.eventListener.add(type);
      }
    });
  });
  return elementRecordings;
};

export const initConsumerMocks = async () => {
  return new Promise<CustomElementsRecordings>((resolve) => {
    document.addEventListener("DOMContentLoaded", () => {
      (async () => {
        const val = "recording";
        const recordings =
          window[val] =
          await getStructureOfUndefinedCustomElements();
        resolve(recordings);
      })();
    });
  });
};