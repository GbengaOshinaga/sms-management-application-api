'use strict'

const User = use('App/Models/User')
const Message = use('App/Models/Message')

class MessageController {
  /**
   * Get the messages of the requesting user with the senders of each message
   * @param {*} param
   * 
   * @return {Object}
   */
  async index ({ auth, response }) {
    try {
      const user = await auth.getUser()
      const messages = await Message.query().where('recipient_id', user.id).with('sender').fetch()
      return response.ok({ data: messages })
  
    } catch (error) {
      return error    
    }
  }

  async getMessagesSentByUser ({ auth, response}) {
    try {
      const user = await auth.getUser()
      const messages = await Message.query().where('sender_id', user.id).with('recipient').fetch()
      return response.ok({ data: messages })
  
    } catch (error) {
      return error    
    }

  }

  /**
   * Save a message
   * @param {*} param
   */
  async store ({ auth, request, response}) {
    try {
      const sender = await auth.getUser()

      const recipient = await User.findOrFail(request.input('recipient'))

      const message = await Message.create({
        sender_id: sender.id,
        recipient_id: recipient.id,
        message: request.input('message')
      })

      return response.created({ data: message })
    } catch (error) {
      return error
    }
  }

  /**
   * Mark a message as read
   * @param {*} param
   */
  async update ({ auth, response, params }) {
    try {
      const user = await auth.getUser()
      const { id } = params
      const message = await Message.findBy('id', id)

      if (message.recipient_id !== user.id) {
        return response.unauthorized({ message: 'This message can only be marked as read by the recipient' })
      }

      message.read = true
      await message.save()

      return response.send({ data: message })
    } catch (error) {
      return error
    }
  }
}

module.exports = MessageController
