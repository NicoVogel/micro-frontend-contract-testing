# Micro Frontends contract driven testing like pact.io

Currently this is only a proof of concept implementation.

## The setup requirements

The micro frontend architecture needs to allow for an individaul client side loading of a micro frontend.
This means that only one micro frontend is loaded.

> Because the idea behind contract driven testing is to test each micro frontend in isolation.

## The idea

The code in `src/index.ts` will provide a dummy implementation for each custom element which is not defined when running this code.
The dummy implementation records any attribute changes and event listeners which are added.
The recorded information is accassible at `window.recording`

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
The array lengh equals the amount of times a custom element was created while recording.
To access the information of one instance use the same index.

## Whats next?

To provide a simimlar experience as pact.io, there are a few thing missing.
Currently only the consumer is mocked.

- create a mock for producer
- create freature to allow for replay of recordings
- enable automisation of etherything
- create a centralized server where recordings can be stored

All of these ideas simply represent what pact.io offers on the microservice server side.

## Template for this repository

I used the template [node-typescript-mocha](https://github.com/NicoVogel/node-typescript-mocha) as basis.