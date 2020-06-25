# This is a template for NodeJS TypeScript Mocha based TDD projects

This template provides:

- a devcontainer for an consistent environment
- linting via eslint
- formatting via prettier
- mocha test which are executed on save

## Repo Structure

The intended structure:

````
src/ 
  - foo.ts
  - <code>

test/
  - foo.test.ts
  - <tests>

dist/
  - foo.js
  - <compiled js>
````

## Enable autorun

- Open the vs code tab `test`
- Click on `...`
- Select `Enable autorun`

## Conventions

### Names

Be explicit!
Do not use add words like `manager` to a class name if not realy needed. 
Bad example: [1]
![The world seen by an "Object-Oriented" programmer](https://i.redd.it/rj8raf1riyny.png) 

Try to use `get` and `set` as less as possible, because they do not add meaning. [1]

Generell

### Structure

Do not bypass the encapsularion layer, becuase otherwise the meaning of an object is lost. [1]

Use `undefined` instead of `null` whenever possible. [2]

## Setup origin

This setup originates from the following sources:

- [1] [ITT 2016 - Kevlin Henney - Seven Ineffective Coding Habits of Many Programmers](https://www.youtube.com/watch?v=ZsHMHukIlJY)
  - formating
  - naming convention
  - structutal convention
- [2] [The Post JavaScript Apocalypse - Douglas Crockford](https://www.youtube.com/watch?v=99Zacm7SsWQ)
  - formatting
  - structutal convention
- [3] [Software Art Thou: Kevlin Henney - What Do You Mean](https://www.youtube.com/watch?v=5cafjDPPtJ0)
  - naming convention
  - structutal convention
- [4] [DevTernity 2017: Ian Cooper - TDD, Where Did It All Go Wrong](https://www.youtube.com/watch?v=EZ05e7EMOLM)
- [5] [Functional architecture - The pits of success - Mark Seemann](https://www.youtube.com/watch?v=US8QG9I1XW0)
