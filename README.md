# ubermind

> an out of the box, build-your-own Firebase-like implementation that can be bound to any express server at a customizeable endpoint or booted up on its own with node or docker.

* free & open source (AGPL-3.0 licensed)
* webhook events for document and collection events
* REST API out of the box
* can be started from the command line 
* docker container for out of the box deploys 
* connects to any existing mongo, and can utilize existing data
* easily extensible / reusable

## why? 

Don't reinvent the wheel. When you need a simple backend persistence layer, you don't need to write an endpoint and controller for everything.
99% of CRUD tasks can be accomplished with a REST interface. Instead, focus on the other difficult parts of your application. 

Since each method is exposed on the root, you can pick and choose what methods you want to use, or you can just mount everything to a custom endpoint and go from there. 

## getting started 

### install the package
`npm install --save ubermind`

### mount the middleware to express

```javascript
const express = require('express')
const ubermind = require('ubermind')

const app = express()
// mount it to an endpoint
app.use('/ubermind', ubermind({
  timestamps: true, // adds timestamps to every object, defaults to true
  webhook: 'localhost:3000', // where it will post events to, defaults to this
  db: 'localhost:27017/ubermind' // specify the database connection string, defaults to this
}));

app.listen(3000, () => {
  console.log('listening on port 3000')
});
```

This will expose the ubermind middleware on to `/ubermind` of your server. 

If you do a `GET` request to the root `/ubermind` URL, you'll see a specification of your ubermind endpoint, version, etc... 

## Create documents 

To create a document, you can simply send a `POST` request to the `/ubermind` endpoint.

`POST` request to `/ubermind` takes a data paylaod of 

```
{
  model: 'todos', // the name of the collection
  data: {
    // any fucking data you want   
  }
}
```

You can also send the model as a url parameter, like this

`/ubermind/todos`

and then in the body of the request, you'd put the data

```
  data: {
    // any other data
  }
```

You don't need to define the models anywhere. Mongo doesn't enforce schemas, so why would we? 

## Query Documents 

If you want to query collections, you can query them with query params on the model. 
This is the endpoin that will be doing most of the heavy lifting for querying.
You can query by any key on your documents using this endpoint, as well as add pagination with `skip`, `limit`, and `offset` query params.

`GET` `/ubermind/todos?limit=50?skip=5` will return all the `todos` collection. 

`GET` `/ubermind?model=todos?limit=50` will return the first 50 documents in the `todos` collection. 

`GET` `/ubermind/todos?task=learn ubermind/learn spanish` will return all the documents in the `todos` collection where the task title is either learn uber or learn spanish. 

Both endpoints allow you to add query params. 
## Update documents 

`PUT` `/ubermind` 

```javascript
{
  model: 'todos',
  id: '1234',
  data: {
    // data to update document with
  }
}
```

or you can do a similar URL parameter request

`PUT` `/ubermind/todos`
```javascript
{
  id: '1234',
  data: {
    // data to update document with
  }
}
```
or
`PUT` `/ubermind/todos/1234`
and this will accept an updated document 
```JSON
{
  // any data goes here 
}
```
## Delete documents 

You can also delete documents with a `DELETE` request. 

#### Delete single document 

`DELETE` `/ubermind`

```
{
  model: 'todos',
  id: '1234'
}
```

#### Delete All 
Delete all documents in a collection.

Since this is a dangerous operation, it requires the `deleteAll` property to be set. 

You can turn this action off in the configs object (see configs section) 

`DELETE` request
```
{
  model: 'todos',
}
```

`deleteAll: true` must be set in the `config` 
#### Delete by query 

You can delete by parameter as well 

```
{
  model: 'todos',
  query: {
    // add any query params. anything that matches will be deleted 
  }
}
```

## Response Objects 

The server sends back a response object for every request that has the following format:

```
{
  status: xxx,
  message: <success or error message>,
  data: {
    // your response data 
  }
}
```

## Authentication 
You can add any authentication middleware in front of the ubermind middleware to lock down the endpoint. 


## Configuration Options 

The middleware takes an optional configuration option 

`deleteAll` // not implemented
`timestamps`
`logger` // not implemented

## Databse string
Must be a valid connection string. Follows mongojs connection string formatting. You can read more about that here. 

## Timestamps 
If `timestamps` is set to true in the configuration, then each object will be created with a `created_at` key. 
On update, each object will have a `updated_at` key either added or updated, depending on if the document has been updated before. 

## Command Line Deployment 

Out of the box, ubermind can start a server from the command line that will listen on port 1337. 

If you want to start it up by the command line`

`npm install -g ubermind`

Then you can run 

`ubermind --help` for a print out of all the available commands.

### Docker Deployment 
You can also start a docker container that will host the hivmeind server. 

```
docker run -p 1337:1337 --link mongo:mongo -e MONGO_URI=<your_mongo_db_uri> -d --name ubermind ubermindapps/ubermind
```

Or there's a docker-compose file that you can curl down and `docker-compose up` 

# Admin interface

Ubermind will mount a dashboard to `/dashboard/` from whatever URL you configured as your base. 
From there, you will be prompted with a username and password box. 

The defaults are 

```
username: admin 
password: pass
```

If you want to change these, add fields to the ubermind config for each of these values. 

i.e. 

```
ubermind({
..., // other properties of your config
username: 'exampleusername', 
password: 'examplepassword'
})
```

# Events 

## Database events 
```db_connected``` - Emitted on database successful connection
```db_error``` - Emitted on database error

## Collection Events 

These are fired when actions on a collection happen. Events are fired in the EventEmitter (Node lifecycle), to the Webhook URL, and to the Socket.io URL.
They all have the same naming convention and payloads. 
 
`<collection>:created` - Emitted when a model is created. They payload of this event is the object that was created.
`<collection>:updated` - Emitted when a model is updated. The payload this event is the `<key>:<value>` pairs that were changed.
`<collection>:deleted` - Emitted when a model is deleted. The payload of this event is the `id`(s) of the documents that were deleted.

# Roadmap 

2.0 Goals 
- [ ] Configurable but simple authentication setup
  - [ ] Expose each endpoint for different authentication / authorization
- [ ] Socket.io introduction (currently only supports webhook) 
- [ ] Sharding / replication setup
- [X] Docker container
- [X] Command line startup via `ubermind run`
- [ ] Improved querying capabilities
- [X] Database admin panel

# Contributing

## Development 
I use nodemon to detect changes in local development. 
You can run `example.js` with this and it loads in the library. 

`nodemon example.js`

Got an improvement? Fixed a bug? Make a PR, I'll check it out. 

# License 
AGPL-3.0 licensed 
