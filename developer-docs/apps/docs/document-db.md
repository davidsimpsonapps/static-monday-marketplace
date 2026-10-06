---
updatedAt: 2026-10-01T09:05:01.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Document DB

The monday code Document DB is a persistent storage solution fully hosted on monday.com’s infrastructure. It integrates seamlessly with your applications, enabling you to securely store your app's data without setting up or maintaining a custom database.

# Introduction

The monday code Document DB is a [MongoDB-compatible](https://www.mongodb.com/) database layer built on [Firebase's](https://firebase.google.com/) infrastructure. It's designed to provide secure, scalable storage within monday.com’s environment. You can use any MongoDB-compatible client library to connect directly from your app.

## Multi-Region

For [multi-region](https://developer.monday.com/apps/docs/multi-region-feature) apps, a separate database is created in each region (e.g., EU, AU, US). For non-multi-region apps, the database is created only in the region where the monday.com account resides.

Data is not synchronized between regions, and monday.com **does not** provide tools to migrate data between regions.

For this reason, we recommend enabling [multi-region](https://developer.monday.com/apps/docs/multi-region-feature) before you start using the Document DB. Doing so ensures your app's data is stored in the same region as each customer's monday.com account, helping you comply with data residency requirements and broader data protection requirements for your customers worldwide.

# Limits

All apps using the Document DB are subject to the following per-region daily limits:

| Category          | Daily Limit (Per Region) |
| :---------------- | :----------------------- |
| Max database size | 1 GiB                    |
| Entity reads      | 50,000 per day           |
| Entity writes     | 20,000 per day           |
| Entity deletes    | 20,000 per day           |

## Resets

Daily limits reset in all regions at midnight Pacific Time.

## Recalculation

The database size is recalculated hourly, per region.

If you exceed the size limit in a region, you may delete data, and access will be automatically restored during the next recalculation window.

## Multi-Region Application

Daily limits are applied independently in each region's database. If your app exceeds any limit in a specific region, all access to that region's database, except for **delete operations**, will be blocked.

In this case, the logs will show the following error:

```
PERMISSION_DENIED: Missing or insufficient permissions
```

This restriction only impacts the affected region; other regions remain fully operational.

# Accessing Document DB

## Prerequisites

* [Multi-region](https://developer.monday.com/apps/docs/multi-region-feature) enabled (optional, but recommended)
* A standard MongoDB client library (Node.js, Python, etc.)
* Access to the [monday code SDK](https://developer.monday.com/apps/docs/monday-code-javascript-sdk)
* [Apps CLI](https://www.npmjs.com/package/@mondaycom/apps-cli?activeTab=readme) version 4.10.2 or higher

## Step 1: Deploy your App

Before you can access Document DB, your app must be deployed at least once. Doing so initializes your database and makes connection strings available.

## Step 2: Retrieve the Runtime Connection String

After deployment, your app automatically receives a secure connection string through the `MNDY_MONGODB_CONNECTION_STRING` environment variable. This is the read/write connection string your app uses for all database operations.

You can retrieve it using the [SDK](https://developer.monday.com/apps/docs/monday-code-javascript-sdk#environment-variables-manager).

Manual configuration is not required. monday code automatically injects this value into your production environment.

## Step 3: Generate a Temporary Connection String

After your app's first deployment, you can also generate a temporary, read-only, 30-minute connection string for inspecting data from your local machine.

Run the following CLI command:

```shell Terminal
mapps database:connection-string
```

# Reference

## CLI Commands

* [`mapps database:connection-string`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-databaseconnection-string)

## SDK Methods

* [`EnvironmentVariablesManager`](https://developer.monday.com/apps/docs/monday-code-javascript-sdk#environment-variables-manager)

## Node.js Example

```javascript
// Using the official MongoDB Node.js driver
const { MongoClient } = require('mongodb');

// Access the connection string from environment variables
const uri = process.env.MNDY_MONGODB_CONNECTION_STRING;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB');
    
    // Access a database
    const database = client.db();
    
    // Access a collection
    const collection = database.collection('your_collection_name'); // Collections are created automatically when you first write to them.
    
    // Basic operations example
    
    // Insert a document
    const insertResult = await collection.insertOne({
      title: 'Task',
      description: 'Complete documentation',
      status: 'In Progress',
      createdAt: new Date()
    });
    console.log('Inserted document:', insertResult);
    
    // Find documents
    const findResult = await collection.find({ status: 'In Progress' }).toArray();
    console.log('Found documents:', findResult);
    
    // Update a document
    const updateResult = await collection.updateOne(
      { _id: insertResult.insertedId },
      { $set: { status: 'Completed' } }
    );
    console.log('Updated document:', updateResult);
    
    // Delete a document
    const deleteResult = await collection.deleteOne({ _id: insertResult.insertedId });
    console.log('Deleted document:', deleteResult);
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    // Close the connection when done
    await client.close();
  }
}

connectToDatabase();

```

## Python Example

```python
# Using pymongo
import os
import pymongo
from pymongo import MongoClient

# Access the connection string from environment variables
uri = os.environ.get('MNDY_MONGODB_CONNECTION_STRING')
client = MongoClient(uri)

try:
    # Access a database
    db = client.get_default_database()
    
    # Access a collection; collections are created automatically when you first write to them.
    collection = db['your_collection_name'] 
    
    # Basic operations example
    
    # Insert a document
    insert_result = collection.insert_one({
        'title': 'Task',
        'description': 'Complete documentation',
        'status': 'In Progress',
        'created_at': pymongo.datetime.datetime.utcnow()
    })
    print(f"Inserted document ID: {insert_result.inserted_id}")
    
    # Find documents
    find_result = collection.find({'status': 'In Progress'})
    for document in find_result:
        print(f"Found document: {document}")
    
    # Update a document
    update_result = collection.update_one(
        {'_id': insert_result.inserted_id},
        {'$set': {'status': 'Completed'}}
    )
    print(f"Modified {update_result.modified_count} document(s)")
    
    # Delete a document
    delete_result = collection.delete_one({'_id': insert_result.inserted_id})
    print(f"Deleted {delete_result.deleted_count} document(s)")
    
except Exception as e:
    print(f"Error: {e}")
finally:
    # Close the connection when done
    client.close()
```

<Callout icon="📘" theme="info">
  Need to scale your app? <Anchor label="Contact our support team" target="_blank" href="https://support.monday.com/hc/en-us/requests/new?ticket_form_id=13855862562962">Contact our support team</Anchor> to request higher monday app limits.
</Callout>

<br />
