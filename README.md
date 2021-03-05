# Pokemon API
Single page application made with react, redux and react-router featuring a pokemon open api.
​
## Quick Start ##
The development enviroment uses react-scripts as a peer dependency, that works with webpack and give us a pretty debug page in cases of error.
​
To run the project, first run in your terminal:

```console
npm install
```

and then

```console
npm run start
```

It is about to open a window of your browser in the *PORT=9000*
(Its pretty odd, but is good to verify if the same is not in use).

## The Application ##
It's being able to the user use a filtering over the loaded store.
The redux store is being synchronized with the localStorage, making
the content load happens only at the first time. We arent counting the
images over here, of course :)

It is also using Asynchronous content loading pattern.

**More soon...**

## About the API ##
The *API* is in this address: https://pokeapi.co/

It was poorfully made, i've tried to search some graphql ready project
to work on, but it wasn't formatted.

In the code, you will see in the models the object modeling using its own
structure and by filtering content for language case of use.
