'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class UserController {
  async store({ auth, request, response }) {
    try {
      const { name, phoneNumber, password } = request.all()
      const user = await User.create({
        name,
        phone_number: phoneNumber,
        password
      })

      const token = await auth.generate(user)

      return response.send({ message: 'Sign up successful', token })  
      
    } catch (error) {
      return error
    }
  }

  async login({ auth, request, response }) {
    try {
      const { phoneNumber, password } = request.all()
      const user = await User.findBy('phone_number', phoneNumber)

      if (!user) return response.unauthorized({ message: 'Invalid phone number or password' })

      const isTheSamePassword = await Hash.verify(password, user.password)

      if (isTheSamePassword) {
        const token = await auth.generate(user)
        return response.send({ message: 'Login successful', token })
      }

      return response.unauthorized({ message: 'Invalid phone number or password' }) 
    } catch (error) {
      return error
    }
  }

  /**
   * Delete a user
   * @param {*} param0 
   */
  async delete({ params, response }) {
    try {
      const { id } = params
      const user = await User.findBy('id', id)

      await user.delete()
    
      return response.send({ message: 'User deleted' })
    
    } catch (error) {
      return error
    }
  }
}

module.exports = UserController
