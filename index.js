module.exports = function(options) {
  options = options || {};
  var storeName = options.storeName || 'sessionStorage' || 'localStorage';
  var cleanupInterval = options.cleanupIntervalSeconds * 1000 || 30000;
  var store = window[storeName];
  if (!store) {
    console.error(storeName, 'The store with name %s is not available');
    return null;
  }
  
  function getItem(key) {
    var item = store.getItem(key);
    return item && item.value;
  }
  
  function setItem(key, value, expireSeconds) {
    return store.setItem(key, JSON.stringify({
      expire: expireSeconds ? Number(new Date()) + (expireSeconds * 1000) : null, 
      value: value 
    }));
  }
  
  function removeItem(key) {
    return store.removeItem(key);
  }
  
  function cleanup() {
    var now = Number(new Date());
    Object.keys(store).forEach(function(key) {
      var item = JSON.parse(store.getItem(key));
      if (item && item.expire && now > item.expire) {
        store.removeItem(key);
      }
    });
  }
  
  cleanup();
  setInterval(cleanup, cleanupInterval);
  
  return {
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    cleanup: cleanup
  };
};