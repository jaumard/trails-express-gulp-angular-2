/**
 * Routes Configuration
 * (trails.config.routes)
 *
 * Configure how routes map to views and controllers.
 *
 * @see http://trailsjs.io/doc/config/routes.js
 */

'use strict'

module.exports = [
  {
    method: 'GET',
    path: '/{action}',
    handler: 'DefaultController.all'
  }, {
    method: 'GET',
    path: '/{action}/{id}',
    handler: 'DefaultController.all'
  }
]
