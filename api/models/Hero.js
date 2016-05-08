'use strict'

const Model = require('trails-model')
const Sequelize = require('sequelize')

/**
 * @module Hero
 * @description Hero document Model
 */
module.exports = class Hero extends Model {

  static config () {
  }

  static schema () {
    return {
      name: { type: Sequelize.STRING, allowNull: false }
    }
  }
}
