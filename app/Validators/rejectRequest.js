'use strict'

class rejectRequest {
  get data () {
    const requestBody = this.ctx.request.all()
    const requestId = this.ctx.params.requestId

   return Object.assign({}, requestBody, { requestId })
  }

  get rules () {
    return {
      requestId: 'requestExistsValidator'
    }
  }
}

module.exports = rejectRequest
