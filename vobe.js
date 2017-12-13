'use strict'

var _ = require('lodash')
var reactRedux = require('react-redux')
var connect = reactRedux.connect


function vobeReducer() {
  var modelTypes = Array.prototype.slice.call(arguments)
  var reducer = function(action) {
    return reducer[action] ? action : modelTypes[0]
  }

  // throw an error if vobeReducer doesn't have the necessary arguments
  if (!modelTypes.length) {
    throw new Error('There is a vobeReducer without any arguments. You need to provide your vobeReducer with a default model type and supplementary model types.')
  } else if (modelTypes.length < 2) {
    throw new Error('There is a vobeReducer with a default model type, but no additional model types. You need to provide your vobeReducer with supplementary model types.')
  }

  // add actions onto reducer, used to dispatch
  else {
    modelTypes.forEach(function(type) {
      reducer[type] = function(actionToDispatch) {
        if (actionToDispatch) dispatch(actionToDispatch)
        dispatch(type)
      }
    })

    return reducer
  }
}
connect()(vobeReducer)


module.exports = {
  vobeReducer
}
