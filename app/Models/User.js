'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get hidden () {
    return ['password', 'created_at', 'updated_at']
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  /**
   * A relationship on messages to get all message sent by User
   * 
   * @method sentMessages
   * 
   * @return {Object}
   */
  sentMessages () {
    return this.hasMany('App/Models/Message', 'sender_id')
  }

  /**
   * A relationship on messages to get all messages received by User
   * 
   * @method receivedMessages
   * 
   * @return {Object}
   */
  receivedMessages () {
    return this.hasMany('App/Models/Message', 'recipient_id')
  }
}

module.exports = User
