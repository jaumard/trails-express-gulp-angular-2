'use strict'

const Controller = require('trails-controller')

/**
 * @module DefaultController
 * @description Generated Trails.js Controller.
 */
module.exports = class DefaultController extends Controller{
  all(req, res) {
    res.sendFile(this.app.config.main.paths.www + '/index.html')
  }
}

