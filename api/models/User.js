/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  attributes: {
  	username: {
        type: 'string',
        unique: true
    },
    password: 'string',
    email: {
        type: 'email',
        required: true,
        unique: true
    },

    role: 'string'
  }

};
