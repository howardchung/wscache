wscache
====

Web Storage Cache: A JavaScript cache utilizing web browser storage technologies (localStorage/sessionStorage)

Features
====
* Lightweight
* Automatic key expiry
* Configurable cleanup interval
* Configurable storage (localStorage/sessionStorage)

Use Cases
====
* Save data from remote APIs in the cache to avoid excessive network calls
* Save some temporary user setting or data that you want to expire automatically after a while

Usage
====
`npm install wscache`


Example
====
```javascript
import wscache from 'wscache';

const cache = wscache({ 
  storeName: 'sessionStorage', // default sessionStorage, also works with localStorage
  cleanupIntervalSeconds: 5 // default 30
});

// Set an item with expiry
cache.setItem('key', 'value', 10);

// Get an item
cache.getItem('key'); // value

// Wait 15 seconds
setTimeout(() => {
  cache.getItem('key'); // null
}, 15000);

// Remove an item
cache.setItem('key2', 'value2');
cache.removeItem('key2');
cache.getItem('key2'); // null;

}
```
