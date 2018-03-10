<template>
  <div class="content hxas-text-centered">

    <!--
  <p>
    <img width="200" src="~assets/logo.svg" :alt="description">
  </p>

  <h1 class="is-title is-bold">{{ name.replace('-', ' ') }}</h1>

  <p>
    <strong>{{ description }}</strong>
  </p>
    -->

<section style="min-width:100%; min-height:100%">

<div class="field is-horizontal">
  <div class="field-label is-normal">
  <label class="label">Name</label>
  </div>
  <div class="field-body">
  <div class="field">
    <p class="control is-expanded">
    <input class="input" type="text" placeholder="First Name" v-model="this.$store.state.user.first_name">
    </p>
  </div>
  <div class="field">
    <p class="control is-expanded">
    <input class="input" type="text" placeholder="Last Name" v-model="this.$store.state.user.last_name">
    </p>
  </div>
  <div class="field-label">
  <!-- Left empty for spacing -->
  </div>
  </div>
</div>

<div class="field is-horizontal">
  <div class="field-label is-normal">
  <label class="label">Email</label>
  </div>
  <div class="field-body">
  <div class="field">
    <p class="control is-expanded">
    <input class="input" type="email" placeholder="jsmith@example.org" v-model="this.$store.state.user.email" disabled>
    </p>
  </div>
  <div class="field-label">
  <!-- Left empty for spacing -->
  </div>
  </div>
</div>

<div class="field is-horizontal">
  <div class="field-label is-normal">
  <label class="label">Phone</label>
  </div>
  <div class="field-body">

  <b-field>
  <b-input placeholder="Phone number..."
    v-model="this.$store.state.user.phone" disabled>
  </b-input>

  <p class="control">
    <button class="button" @click="unimplemented()">Change Phone</button>
  </p>

  </b-field>
    <div class="field-label">
  <!-- Left empty for spacing -->
  </div>
  </div>
</div>

<div class="field is-horizontal">
  <div class="field-label is-normal">
  <label class="label">Birthday</label>
  </div>
  <div class="field-body">

  <b-field>
    <b-datepicker
      placeholder="Click to select date"
      icon="calendar"
      >
    </b-datepicker>
  </b-field>

  <div class="field-label">
  <!-- Left empty for spacing -->
  </div>
  <div class="field-label">
  <!-- Left empty for spacing -->
  </div>
  <div class="field-label">
  <!-- Left empty for spacing -->
  </div>
  </div>
</div>

<!--
<div class="field is-horizontal">
  <div class="field-label">
  <label class="label">Is Active?</label>
  </div>
  <div class="field-body">
  <div class="block">
  <b-radio v-model="profile.active"
    native-value="true">
    Yes
  </b-radio>
  <b-radio v-model="profile.active"
    native-value="false">
    No
  </b-radio>
  </div>
  </div>
</div>
-->

<!--
<div class="field is-horizontal">
  <div class="field-label">
  <label class="label">Social</label>
  </div>
  <div class="field-body">
  <div class="block">

  <button class="button is-info" @click="unimplemented()">&nbsp;<i class="fa fa-facebook"></i>&nbsp;Facebook Link</button>
  <button class="button is-danger" @click="unimplemented()"><i class="fa fa-google-plus"></i>&nbsp;Google Link</button>

  </div>
  </div>
</div>
-->

<div class="field is-horizontal">
  <div class="field-label is-normal">
  <label class="label">Password</label>
  </div>
  <div class="field-body">
  <div class="field">
    <p class="control is-expanded">
    <input class="input" :class="this.passwordType" type="password" placeholder="******" v-model="password">
    </p>
  </div>
  <div class="field">
    <p class="control is-expanded">
    <input class="input" :class="this.passwordType2" type="password" placeholder="******" v-model="password_confirmation">
    </p>
  </div>
  <div class="field-label">
  <!-- Left empty for spacing -->
  </div>

  </div>
</div>

<div class="field is-horizontal">
  <div class="field-label is-normal">
  <label class="label"></label>
  </div>
  <div class="field-body">
  <div class="hero">
    {{this.passwordMessage}}
  </div>
  </div>
</div>

<hr>

<div class="field is-horizontal">
  <div class="field-label">
  <!-- Left empty for spacing -->
  </div>
  <div class="field-body">
  <div class="field">
    <div class="control">
    <button class="button is-danger" v-on:click="saveProfile()">
      <span class="icon"><i class="fa fa-save"></i></span>&nbsp;&nbsp;Save
    </button>
    <div style="clear:both"></div>
    </div>
  </div>
  </div>
</div>

</section>

  </div>
</template>

<script>
import Menu from '../menus'

export default {
  data () {
    return {
      name: 'Profile',
      password: '',
      password_confirmation: '',
      description: ''
    }
  },

  methods: {
    unimplemented () {
      this.$snackbar.open({ type: 'is-danger', message: 'Not yet implemented' })
    },

    saveProfile () {

      // if (this.checkPassword().type !== '') {
      //   return
      // }

      // var csrf_token = document.querySelector('meta[name="csrf-token"]').content
      // var csrf_param = document.querySelector('meta[name="csrf-param"]').content

      // this.profile.date_of_birth = this.profile.birthday
      // var params = Object.assign({
      //   //
      // },
      // this.profile)

      /*
      var method = 'PUT'
      var url = this.$config.api_entry + `/wp-json/v2/users/me`
      this.$http({ method: method, 'url': url, params })
        .then(response => {
          console.log(response)
          if (response.data.id) {
            // var prevId = this.id
            this.id = response.data.id
            this.password = ''
            this.password_confirmation = ''
            this.$snackbar.open('Profile updated.')
          }
        })
        .catch(() => {
          this.$snackbar.open({ type: 'is-danger', message: 'Error saving profile details.' })
        })
        */
    },

    checkPassword () {
      if (this.password && this.password.length > 0) {
        if (this.password.length < 4) {
          return { type: 'is-danger', type2: '', message: 'password is too short' }
        }
        if (this.password !== this.password_confirmation) {
          return { type: 'is-danger', type2: 'is-danger', message: 'passwords do not match' }
        }
      }
      return { type: '', type2: '', message: '' }
    }
  },

  computed: {
    passwordMessage () {
      return this.checkPassword().message
    },
    passwordType () {
      return this.checkPassword().type
    },
    passwordType2 () {
      return this.checkPassword().type2
    }
  },

  mounted () {
    this.$store.commit('ui/SET_MENU', Menu)
    this.$store.commit('ui/SHOW_FULLPAGE', false)
    this.$store.commit('ui/SHOW_LEVELBAR', true)

    // this.profile = this.$store.state.user
  }

}
</script>

<style lang="scss" scoped>
.content {
  padding: 0px;
  margin: 12px;
  margin-top:0px;
  margin-bottom:10px;
  min-height:600px;
  --border:2px solid red;
}
</style>
