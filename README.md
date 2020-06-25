# Micro Frontends contract driven testing like pact.io

Currently this is only a proof of concept implementation.

## The setup requirements

The micro frontend architecture needs to allow for an individual client-side loading of a micro frontend.
This means that only one micro frontend is loaded.

> Because the idea behind contract driven testing is to test each micro frontend in isolation.

## The idea

The code in `src/index.ts` will provide a dummy implementation for each custom element which is not defined when running this code.
The dummy implementation records any attribute changes and event listeners which are added.
The recorded information is accessible at `window.recording`

```js
interface AttributeStructure {
  [attributeName: string]: string;
}
interface AttributeChange {
  attributeName: string;
  newValue: string;
}
interface CustomElementsRecordings {
  [customElementName: string]: {
    structures: AttributeStructure[];
    attributeChanges: AttributeChange[][];
    eventListeners: Set<string>[];
  };
}
```

The object structure of `window.recording` corresponds to the interface `CustomElementsRecordings`.
Each attribute of a custom element is an array.
The array length equals the amount of times a custom element was created while recording.
To access the information of one instance, use the same index.

> `structures` only contains attributes which were present when first creating the custom element

> `attributeChanges` contains all changes, but does not include starting values

## Whats next?

To provide a similar experience as pact.io, there are a few thing missing.
Currently only the consumer is mocked.

- create a mock for producer
- create feature to allow for replay of recordings
- enable automation  of everything
- create a centralized server where recordings can be stored

All of these ideas simply represent what pact.io offers on the microservice server side.

## Template for this repository

I used the template [node-typescript-mocha](https://github.com/NicoVogel/node-typescript-mocha) as basis.