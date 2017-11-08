wscache
====

A JavaScript cache utilizing web browser storage technologies (localStorage/sessionStorage)

Features
====
* Lightweight
* Automatic key expiry
* Configurable cleanup interval
* Configurable storage (localStorage/sessionStorage)

Usage
====
```
import wscache from 'wscache';

const cache = wscache({ storeName: 'sessionStorage', cleanupIntervalSeconds: 5 });

// Set an item with expiry
cache.setItem('key', 'value', 10);

// Get an item
cache.getItem('key'); // value

// Wait 15 seconds
setTimeout(() => {
  cache.getItem('key'); // null
}, 15000);

}
```
