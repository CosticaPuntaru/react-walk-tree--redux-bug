import reactTreeWalker from 'react-tree-walker';
import * as React from 'react';
import { get } from 'lodash';

const defaultContext = {
  reactAsyncBootstrapperRunning: true,
  isSSR: true,
};

function visitor(checkStore, element, instance) {
  if (instance && typeof instance.bootstrap === 'function') {
    const waitForBootstrap = instance.bootstrap();
    const safeAwait = Array.isArray(waitForBootstrap) ? waitForBootstrap : [waitForBootstrap];
    const promiseList = safeAwait.map(checkStore);
    return Promise.all(promiseList);
  }
  return undefined;
}

export default function asyncBootstrapper(store, app, options, context = {}) {
  let cbList = [];

  function checkCbList() {
    const state = store.getState();
    cbList = cbList.filter((item) => {
      if (item.check(state)) {
        item.resolve();
        return false
      }
      return true;
    });
  }

  const unsubscribe = store.subscribe(checkCbList);

  function checkStore(verifier) {
    if (typeof verifier === 'string') {
      return new Promise((resolve) => {
        cbList.push({
          check: (state) => {
            return !!get(state, verifier);
          },
          resolve
        });
        checkCbList();
      });
    } else if (typeof verifier === 'function') {
      return new Promise((resolve) => {
        cbList.push({
          check: verifier,
          resolve
        });
        checkCbList();
      });
    } else if (verifier && typeof verifier.then === 'function') {
      return verifier;
    }
  }

  return reactTreeWalker(
    app,
    visitor.bind(null, checkStore),
    {
      ...context,
      ...defaultContext,
    },
    options
  ).then(() => {
    unsubscribe()
  });
}
