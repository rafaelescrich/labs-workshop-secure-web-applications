import { Router, Request, Response } from 'express';

import { Document, DocumentDataStore } from '../services/document-datastore';

import { authenticateUser, tokenValidator } from './auth';

/**
* Create and export sub-router for '/api/documents'
*/
export var router = Router( );

router.use( tokenValidator );

/**
* RESTful API ('CRUD'-style)
*   GET    /api/documents/              (auth) return list of User's Documents
*   PUT    /api/documents/              (auth) create new Document
*
*   GET    /api/documents/<id>          (auth) get Document
*   POST   /api/documents/<id>          (auth) update Document
*   DELETE /api/documents/<id>          (auth) delete Document
*/
router
  .get( '/',  authenticateUser, (req, res) => {
    DocumentDataStore.listDocuments( req.user.username )
      .then( docs => {
        res.json( { documents: docs } );
      })
      .catch( (err) => { res.status( 403 ).send( err ); } );
  })
  .put( '/', authenticateUser, (req, res) => {
    // create new document in datastore
    DocumentDataStore.createDocument( <Document>req.body, req.user.username )
      .then( doc => {
        res.json( doc );
      })
      .catch( (err) => { res.status( 403 ).send( err ); } );
  })
  .get( '/:id', authenticateUser, (req: Request, res) => {
    DocumentDataStore.getDocument( req.params.id, req.user.username )
      .then( doc => {
        res.json( doc );
      })
      .catch( (err) => { res.status( 403 ).send( err ); } );
  })
  .post( '/:id', authenticateUser, (req: Request, res) => {
    DocumentDataStore.updateDocument( req.params.id, req.user.username, req.params )
      .then( doc => {
        res.json( doc );
      })
      .catch( (err) => { res.status( 403 ).send( err ); } );
  })
  .delete( '/:id', authenticateUser, (req: Request, res) => {
    DocumentDataStore.deleteDocument( req.params.id, req.user.username )
      .then( ok => {
        res.json( { status: ok } );
      })
      .catch( (err) => { res.status( 403 ).send( err ); } );
  });
