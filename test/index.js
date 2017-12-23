const chai = require('chai')
const expect = chai.expect
const express = require('express')


describe('#ubermind', () => {
    it('should error if database connection does not happen', (done) => {

    })
  })

  describe('#create', () => {
    it('should create a document given a request obejct', (done) => {

    })

    it('should create a document given a request object and url params', (done) => {

    })

    it('should create multiple documents give an array of objects', (done) => {

    })

    it('should handle errors correctly', (done) => {

    })
  })

  describe('#get', () => {
    it('should handle a get request object correctly', (done) => {

    })

    it('should return a document given a collection and _id as url params', (done) => {

    })

    it('should handle querying in the url parameters', (done) => {

    })

    it('should handle querying in the request object', (done) => {

    })

    it('should handle errors correctly', (done) => {

    })
  })

  describe('#update', () => {
    it('should find document by id in request object and update accordingly', (done) => {

    })

    it('should find document by collection && id in url params and update document accordingly', (done) => {

    })

    it('should find documents by query and update all them accordingly', (done) => {

    })

    it('should handle errors correctly', (done) => {

    })
  })

  describe('#delete', () => {
    it('should delete a document given a request object', (done) => {

    })

    it('should delete a document given a request object and url params', (done) => {

    })

    it('should delete any documents matching a query', (done) => {

    })

    it('should handle errors correctly', (done) => {

    })
  })
})
