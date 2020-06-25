
document.addEventListener("DOMContentLoaded", () => {

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
    })
    return new Promise<string[]>((resolve) => {
      // this queues another micro task which is executed after 
      // all the previously defined micro tasks
      queueMicrotask(() => {
        resolve(Array.from(uniqueElements)
          .filter((value) => !definedElements.includes(value)))
      });
    });
  }

  interface AttributeStructure {
    [name: string]: string;
  }
  interface AttributeChange {
    attributeName: string;
    newValue: string;
  }
  interface CustomElementsRecordings {
    [name: string]: {
      structures: AttributeStructure[];
      attributeChanges: AttributeChange[][];
      eventListeners: Set<string>;
    };
  }


  const copyAttributes = (element: HTMLElement,
    structures: AttributeStructure[]) => {

    // getAttributeNames can contain duplicates
    const structure = {};
    Array.from(new Set<string>(element.getAttributeNames()))
      .forEach((name) => {
        structure[name] = element.getAttribute(name);
      });
    structures.push(structure);
  }

  const observeAnyAttributeChange = (Element: HTMLElement,
    attributeChanges: AttributeChange[]) => {

    // origin: https://github.com/w3c/webcomponents/issues/565#issuecomment-345556883
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes") {
          const newVal = (mutation.target as HTMLElement)
            .getAttribute(mutation.attributeName);
          attributeChanges.push({
            attributeName: mutation.attributeName, newValue: newVal
          })
        }
      });
    });
    observer.observe(Element, { attributes: true });
  }

  const getStructureOfUndefinedCustomElements = async () => {
    const undefinedCustomElements = await getAllUndefinedCustomElements();
    const elementsStructure: CustomElementsRecordings = {};

    undefinedCustomElements.forEach((element) => {
      const currentElement = elementsStructure[element] =
      {
        structures: [],
        attributeChanges: [],
        eventListeners: new Set<string>()
      };

      customElements.define(element, class extends HTMLElement {
        constructor() {
          super();
        }
        connectedCallback() {
          copyAttributes(this, currentElement.structures);
          const attributeChangesOfCurrentElement: AttributeChange[] = [];
          currentElement.attributeChanges.push(attributeChangesOfCurrentElement)
          observeAnyAttributeChange(this, attributeChangesOfCurrentElement);
        }
        addEventListener(
          type, listener, options
        ) {
          super.addEventListener(
            type, listener, options
          );
          currentElement.eventListeners.add(type);
        }
      })
    });
    return elementsStructure;
  }


  (async () => {
    const val = "recording"
    window[val] = await getStructureOfUndefinedCustomElements();
    console.log(window[val])
  })()
})