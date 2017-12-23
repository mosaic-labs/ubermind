# hivemind
> an open source firebase clone that mounts to an express endpoint and uses mongoDB as a persistence layer. 

## getting started 

### install the package
`npm install --save hivemind`

### mount the middleware to express

```javascript
const express = require('express');
const hivemind = require('hivemind');
const db = require('./db'); // this needs to be a connection to a MongoDB instance
const app = express(); 

app.use(hivemind('/hivemind', app, db, options));

app.listen(3000, () => {
  console.log(`listening on port 3000`);
});
```

This will expose the hivemind middleware on to `/hivemind` of your server. 

If you do a `GET` request to the root `/hivemind` URL, you'll see a specification of your hivemind endpoint, version, etc... 

## Create documents 

To create a document, you can simply send a `POST` request to the `/hivemind` endpoint.

`POST` request to `/hivemind` takes a data paylaod of 

```
{
  model: 'todos', // the name of the collection
  data: {
    // any fucking data you want   
  }
}
```

You can also send the model as a url parameter, like this

`/hivemind/todos`

and then in the body of the request, you'd put the data

```
  data: {
    // any other data
  }
```

You don't need to define the models anywhere. Mongo doesn't enforce schemas, so why would we? 

## Query Documents 

If you want to query collections, you can query them with query params on the model. 

`GET` `/hivemind/todos` will return all the `todos` collection. 

`GET` `/hivemind?model=todos?limit=50` will return the first 50 documents in the `todos` collection. 

The second method allows you to add query params. 

## Update documents 

`PUT` `/hivemind` 

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

`PUT` `/hivemind/todos`
```javascript
{
  id: '1234',
  data: {
    // data to update document with
  }
}
```
or
`PUT` `/hivemind/todos/1234`
and this will accept an updated document 
```JSON
{
  // any data goes here 
}
```
## Delete documents 

You can also delete documents with a `DELETE` request. 

#### Delete single document 

`DELETE` `/hivemind`

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

```
{
  model: 'todos',
  deleteAll: true
}
```

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
  meta: {
    skip: xxx,
    limit: xxx,
    total: xxx
  },
  data: {
    // your response data 
  }
}
```

## Authentication 
You can add any authentication middleware in front of the hivemind middleware to lock down the endpoint. 

## Configuration Options 

The middleware takes an optional configuration option 

`deleteAll`
`timestamps`
`logger`

## Command Line Deployment 

Out of the box, hivemind can start a server from the command line that will listen on port 1337. 

If you want to start it up by the command line`

`npm install -g hivemind`

Then you can run 

`hivemind --help` for a print out of all the available commands.

### Docker Deployment 
You can also start a docker container that will host the hivmeind server. 

```
docker run -p 1337:1337 --link mongo:mongo -e MONGO_URI=<your_mongo_db_uri> -d --name hivemind hivemindapps/hivemind
```

Or there's a docker-compose file that you can curl down and `docker-compose up` 


