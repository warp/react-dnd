'use strict';

var dragSourcesByType = {};
var dropTargetsByType = {};

function registerHandlers(registry, component, handlers) {
  Object.keys(handlers).forEach(type => {
    registry[type] = registry[type] || [];
    registry[type].push({
      component: component,
      handler: handlers[type]
    });
  });
}

function unregisterHandlers(registry, component, handlers) {
  Object.keys(handlers).forEach(type => {
    registry[type] = registry[type].filter(
      entry => entry.component !== component
    );

    if (!registry[type].length) {
      delete registry[type];
    }
  });
}

function registerComponent(component, dragSources, dropTargets) {
  registerHandlers(dragSourcesByType, component, dragSources);
  registerHandlers(dropTargetsByType, component, dropTargets);
}

function unregisterComponent(component, dragSources, dropTargets) {
  unregisterHandlers(dragSourcesByType, component, dragSources);
  unregisterHandlers(dropTargetsByType, component, dropTargets);
}

module.exports = {
  registerComponent,
  unregisterComponent
};