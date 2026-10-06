---
updatedAt: 2025-10-23T05:05:04.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# monday.storage

Storage API

The monday apps infrastructure includes a persistent, key-value storage that developers can leverage to store data without creating their own backend and maintaining their own database. It offers both **instance** and **global** storage to store your app's data, and you can use the `monday.storage` SDK method to interact with it.

The following limits apply to both the instance and global-level methods:

* Key length limit: **256**

* Storage limit per key: **6MB**

# Methods

All methods return a `Promise` which will be `resolved` to the Storage API's response.

| Method                                               | Description                                                                  |
| :--------------------------------------------------- | :--------------------------------------------------------------------------- |
| monday.storage.instance.getItem(key, options)        | Returns a stored value from the database under `key` for a specific instance |
| monday.storage.instance.setItem(key, value, options) | Stores `value` under `key` in the database for a specific instance           |
| monday.storage.instance.deleteItem(key, options)     | Deletes a stored value from the database under `key` for a specific instance |
| monday.storage.getItem(key, options)                 | Returns a stored value from the database under `key`                         |
| monday.storage.setItem(key, value, options)          | Stores `value` under `key` in the database                                   |
| monday.storage.deleteItem(key, options)              | Deletes a stored value from the database under `key`                         |

# Instance level

With instance-level storage, each application instance (i.e. a single board view or a dashboard widget) maintains its own storage. Apps cannot share storage across accounts or even across apps installed in the same location. Instance-level storage doesn't work for all app feature types, just those with instances.

The storage resets each time you introduce a new major version since each version has its own instances, and storage management occurs on the server side. Instance-level storage is also compartmentalized according to the `accountId`, `app`, and `instance`.

## Versioning

You may encounter situations where multiple users work on the same app instance and write to the same key unsynchronized. If you're storing a compound data structure (like JSON) in that key, such operations may overwrite each other.

`getItem` and `setItem` each return a version identifier you can use to identify the value currently stored in a key. Whenever a write that changes the value occurs, the version identifier in the database changes. The identifier signifies whether or not a value changed from another location and prevents it from being overwritten.

## Examples

The following code samples demonstrate how to interact with the database using the `monday.storage` method on an instance level.

### Versioning

#### Request

```javascript
monday.storage.instance.getItem('serialKey').then(res => {
 const { value, version } = res.data;
 sleep(10000); // someone may overwrite serialKey during this time

 monday.storage.instance.setItem('serialKey', { previous_version: version }).then(res => {
  console.log(res);
 }
});
```

#### Returns

```json
{
    "method": "storage",
    "data": {
        "success": false,
        "error": "Version mismatch: key myKeyName was updated from another context and versioning is enabled"
    },
    "requestId": "123456"
}
```

### Set a new value

#### Request

```javascript
monday.storage.instance.setItem('mykey', 'Lorem Ipsum').then(res => {
 console.log(res);
});
// => { "success": true }
```

#### Returns

```json
{
  "method" : "storage",
  "data" : {
    "success" : true,
    "version" : "465cc"
  },
  "requestId" : "123456"
}

```

### Get a value

#### Request

```javascript
monday.storage.instance.getItem('mykey').then(res => {
  console.log(res.data.value);
});
// => 'Lorem Ipsum'
```

#### Returns

```json
{
  "method" : "storage",
  "data" : {
    "value" : "Lorem Ipsum", 
    "version" : "465cc",
    "success" : true
  },
  "requestId" : "123456"
}
```

### Delete an item

#### Request

```javascript
monday.storage.instance.deleteItem('mykey').then(res => {
  console.log(res.data);
}
```

#### Returns

```json
{
  "method" : "storage",
  "data" : {
    "value" : null,
    "success" : true
  },
  "requestId" : "123456"
}
```

# Global level

With global-level storage, each application maintains its own storage and shares it across all app usages. Unlike instance-level methods, storage is not tied to a specific instance. Storage doesn't reset between major versions since it is shared across the entire app, not just an instance.

Developers are the ones who manage how items are stored on the client side - not monday. We add the instance as another layer of compartmentalization for instance-level storage, but the global storage does not have this. It is compartmentalized according to the `accountId` and `app`, so data from one account is not accessible from others.

## Versioning

Just like instance-level storage, global-level storage also supports versions.

`getItem` and `setItem` each return a version identifier you can use to identify the value currently stored in a key. Whenever a write that changes the value occurs, the version identifier in the database changes. The identifier signifies whether or not a value changed from another location and prevents it from being overwritten.

## Examples

The following code samples demonstrate how to interact with the database using the `monday.storage` method globally.

### Versioning

#### Request

```javascript
monday.storage.getItem('serialKey').then(res => {
 const { value, version } = res.data;
 sleep(10000); // someone may overwrite serialKey during this time

 monday.storage.setItem('serialKey', { previous_version: version }).then(res => {
  console.log(res);
 }
});
```

### Set a new value

#### Request

```javascript
monday.storage.setItem('mykey', 'Lorem Ipsum').then(res => {
 console.log(res);
});
```

### Get a value

#### Request

```javascript
monday.storage.getItem('mykey').then(res => {
  console.log(res.data.value);
});
```

### Search for a value

#### Request

```javascript
monday.storage.searchItem('mykey').then(res => {
  console.log(res.data);
}
```

### Delete an item

#### Request

```javascript
monday.storage.deleteItem('mykey').then(res => {
  console.log(res.data);
}
```

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
