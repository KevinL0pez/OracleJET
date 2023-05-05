/**
  Copyright (c) 2015, 2020, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

module.exports = function (configObj) {
  return new Promise((resolve) => {
    console.log('Running after_component_create hook.');
    // const componentPath = configObj.componentPath;
    resolve(configObj);
  });
};