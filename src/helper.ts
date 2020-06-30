
const getDefinedCustomElements = async (uniqueElements: Set<string>) =>{
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
    queueMicrotask(() => 
    // create a new array 
      resolve([...definedElements]));
  });
};
  
const getUndefinedCustomElements = async (uniqueElements: Set<string>) => {
  const definedElements = await getDefinedCustomElements(uniqueElements);
  return Array.from(uniqueElements)
    .filter((value) => !definedElements.includes(value));
};


export { getUndefinedCustomElements, getDefinedCustomElements };

