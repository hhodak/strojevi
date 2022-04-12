<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button
            type="button"
            class="
              inline-flex
              items-center
              justify-center
              p-2
              rounded-md
              text-gray-400
              hover:text-white hover:bg-gray-700
              focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white
            "
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              class="hidden h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          class="
            flex-1 flex
            items-center
            justify-center
            sm:items-stretch sm:justify-start
          "
        >
          <div class="flex-shrink-0 flex items-center">
            <img
              class="block lg:hidden h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Workflow"
            />
            <img
              class="hidden lg:block h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
              alt="Workflow"
            />
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <nuxt-link to="/" class="homeBtn">⌂ Home</nuxt-link>
              <nuxt-link v-if="!this.$auth.loggedIn" to="/loginRegistration/registration" class="homeBtn">✚ Registration</nuxt-link>
              <nuxt-link v-if="!this.$auth.loggedIn" to="/loginRegistration/login" class="homeBtn">➲ Login</nuxt-link>
              <nuxt-link v-if="this.$auth.loggedIn" to="/machines" class="homeBtn">☸ Machines</nuxt-link>
              <nuxt-link v-if="this.$auth.loggedIn && this.isAdministrator" to="/users" class="homeBtn">☺ Users</nuxt-link>
              <nuxt-link v-if="this.$auth.loggedIn && this.isAdministrator" to="/roles" class="homeBtn">♙ Roles</nuxt-link>
              <nuxt-link v-if="this.$auth.loggedIn && this.isAdministrator" to="/logs" class="homeBtn">✎ Logs</nuxt-link>
              <nuxt-link v-if="this.$auth.loggedIn" to="/chat" class="homeBtn">✉ Chatroom</nuxt-link>
              <nuxt-link v-if="this.$auth.loggedIn" :to="'/users/' + currentUserId" class="homeBtn">★ {{currentUserName}}</nuxt-link>
              <nuxt-link v-if="this.$auth.loggedIn" to="/loginRegistration/logout" class="homeBtn">✘ Odjava</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { UserRoles } from "~/components/enums/UserRole"

export default {  
  data(){
    return{
      isAdministrator: false,
      currentUserId: 0,
      currentUserName: ""
    }
  },
  async beforeMount(){     
    if(this.$auth.loggedIn) {
      this.currentUserId = this.$auth.user.id;
      this.currentUserName = this.$auth.user.username;
      this.isAdministrator = (this.$auth.user.role_id == UserRoles.Administrator);
    }    
  }
}
</script>

<style>
</style>