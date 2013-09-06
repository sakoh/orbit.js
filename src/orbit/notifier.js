var Notifier = function() {
  this.listeners = [];
};

Notifier.prototype = {
  addListener: function(callback, binding) {
    binding = binding || this;
    this.listeners.push([callback, binding]);
  },

  removeListener: function(callback, binding) {
    var listeners = this.listeners,
        listener;

    binding = binding || this;
    for (var i = 0, l = listeners.length; i < l; i++) {
      listener = listeners[i];
      if (listener && listener[0] === callback && listener[1] === binding) {
        listeners.splice(i, 1);
        return;
      }
    }
  },

  emit: function() {
    var listeners = this.listeners,
        listener;

    for (var i = 0, l = listeners.length; i < l; i++) {
      listener = listeners[i];
      if (listener) {
        listener[0].apply(listener[1], arguments);
      }
    }
  },

  poll: function() {
    var listeners = this.listeners,
        listener,
        allResponses = [],
        response;

    for (var i = 0, l = listeners.length; i < l; i++) {
      listener = listeners[i];
      if (listener) {
        response = listener[0].apply(listener[1], arguments);
        if (response !== undefined) { allResponses.push(response); }
      }
    }

    return allResponses;
  }
}

export default Notifier;