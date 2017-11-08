module.exports = function(options) {
  var storeName = options.storeName || 'sessionStorage' || 'localStorage';
  var cleanupInterval = options.cleanupIntervalSeconds * 1000 || 30000;
  var store = window[storeName];
  if (!store) {
    console.error(storeName, 'The store with name %s is not available');
    return null;
  }
  
  function getItem(key) {
    return store.getItem(key);
  }
  
  function setItem(key, value, expireSeconds) {
    return store.setItem(key, { 
      expire: expireSeconds ? new Date() + (expireSeconds * 1000) : null, 
      value: value 
    });
  }
  
  function cleanup() {
    Object.keys(store).forEach(function(key) {
      if (store[key] && store[key].expire && new Date() > store[key].expire) {
        store.removeItem(key);
      }
    });
  }
  
  cleanup();
  setInterval(cleanup, cleanupInterval);
  
  return {
    getItem: getItem,
    setItem: setItem,
    cleanup: cleanup
  };
};