/* the God Object */
class WPApi {
  constructor () {
    this.$router = null
    this.$store = null
    this.$firebase = null
    this.$http = null
  }

  getUserProfile () {
    var url = this.$config.api_entry + `/wp/v2/users/me`

    return this.$http({ method: 'GET', 'url': url })
      .then(response => {
        // this.id = response.data.id

        var user = response.data

        this.$store.commit('user/SET_USER', {
          id: user.id,
          email: user['email'],
          displayName: user['displayName'],
          first_name: user['meta']['first_name'][0],
          last_name: user['meta']['last_name'][0],
          phone: user['meta']['billing_phone'][0]
        })

        return Promise.resolve(this.$store.state.user)
      })
      .catch(console.log)
  }

  getVendors () {
    var url = this.$config.api_entry + `/wp/v2/taxonomies/wcpv_product_vendors`

    return this.$http({ method: 'GET', 'url': url })
      .then(response => {
        console.log(response.data)

        return Promise.resolve(response.data)
      })
      .catch(console.log)
  }
}

export default new WPApi()
