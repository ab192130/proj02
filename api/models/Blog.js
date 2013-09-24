/**
 * Blog
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  attributes: {
  	title: 'string',
  	content: 'string',
  	author: {
        type: 'string'
//        model: 'User'
    },

    privacy: 'string' // 0 = only_me, 1 = public
  }

};
