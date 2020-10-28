'use strict'

class returnBook {

  get data () {
    const requestBody = this.ctx.request.all()
    const bookId = this.ctx.params.bookId

   return Object.assign({}, requestBody, { bookId })
  }

  get rules () {
    return {
      bookId: 'bookExistsValidator'
    }
  }
}

module.exports = returnBook
