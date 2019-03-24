'use strict'

const Schema = use('Schema')

class MessageSchema extends Schema {
  up () {
    this.create('messages', (table) => {
      table.increments()
      table.text('message')
      table.integer('sender_id')
      table.integer('recipient_id')
      table.boolean('read').defaultTo(false)
      table.foreign('sender_id').references('id').inTable('users').onDelete('CASCADE')
      table.foreign('recipient_id').references('id').inTable('users').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('messages')
  }
}

module.exports = MessageSchema
