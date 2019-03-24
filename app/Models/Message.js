'use strict'

const Model = use('Model')

class Message extends Model {
  /**
   * A relationship to get the sender of the message
   * 
   * @method sender
   * 
   * @return {Object}
   */
  sender() {
    return this.belongsTo('App/Models/User', 'sender_id')
  }

  /**
   * A relationship to get the recipient of the message
   * 
   * @method recipient
   * 
   * @return {Object}
   */
  recipient() {
    return this.belongsTo('App/Models/User', 'recipient_id')
  }
}

module.exports = Message
