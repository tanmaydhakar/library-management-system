'use strict'

class showBook {

  get data () {
    const requestBody = this.ctx.request.all()
    const bookId = this.ctx.params.bookId

   return Object.assign({}, requestBody, { bookId })
  }

  get rules () {
    return {
      bookId: 'BookExists'
    }
  }
}

module.exports = showBook
