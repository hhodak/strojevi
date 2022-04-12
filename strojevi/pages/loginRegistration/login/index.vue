<template>
  <div>
    <Header />
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
      <form action="/" method="GET">
        <div class="shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 bg-white sm:p-6">
            <div class="grid grid-cols-5 gap-2">
              <div class="col-span-3">
                <label
                  for="username"
                  class="block text-sm font-medium text-gray-700"
                  >Username</label
                >
                <input
                  type="text"
                  key="username"
                  name="username"
                  id="username"
                  v-model="username"
                  class="
                    mt-1
                    focus:ring-indigo-500 focus:border-indigo-500
                    block
                    w-full
                    shadow-md shadow-black
                    sm:text-sm
                    border-gray-300
                    rounded-md
                  "
                />
              </div>

              <div class="col-span-3">
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700"
                  >Password</label
                >
                <input
                  type="text"
                  key="password"
                  name="password"
                  id="password"
                  v-model="password"
                  class="
                    mt-1
                    focus:ring-indigo-500 focus:border-indigo-500
                    block
                    w-full
                    shadow-md shadow-black
                    sm:text-sm
                    border-gray-300
                    rounded-md
                  "
                />
              </div>
            </div>
            <div class="px-3 py-4">
              <button type="submit" class="button" @click="onClick($event)">
                Log in
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Header from "~/components/Header";

export default {
  name: "Login",
  components: {
    Header,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onClick(e) {
      e.preventDefault();

      let path = "../loginRegistration/login";

      //login
      try {
        await this.$auth
          .loginWith("local", {
            data: {
              username: this.username,
              password: this.password,
            },
          })
          .then(() => console.log("Logged In!"));

        // //session
        if (this.$auth.loggedIn) {
          await this.$store.dispatch("addLog", {
            action: `LOGIN: ${this.$auth.user.id}`,
            userId: this.$auth.user.id,
          });
          path = "/";
        } else {
          alert("Username or password are incorrect! Try again...");
        }

        //redirect
        this.$router.push(path);
      } catch (error) {
        console.log("Neuspjela prijava");
      }
    },
  },
};
</script>

<style>
</style>