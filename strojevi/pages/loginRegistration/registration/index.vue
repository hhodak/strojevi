<template>
  <div>
    <Header />
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
      <form action="/" method="POST">
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

              <div class="col-span-3">
                <label
                  for="full_name"
                  class="block text-sm font-medium text-gray-700"
                  >Full name</label
                >
                <input
                  type="text"
                  key="full_name"
                  name="full_name"
                  id="full_name"
                  v-model="full_name"
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
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                  >E-mail</label
                >
                <input
                  type="text"
                  key="email"
                  name="email"
                  id="email"
                  v-model="email"
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
                Register
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
import { CrudManager } from "~/components/crudManager/crudManager.js";

export default {
  name: "Registration",
  components: {
    Header,
  },
  data() {
    return {
      username: "",
      password: "",
      full_name: "",
      email: "",
    };
  },
  methods: {
    async onClick(e) {
      e.preventDefault();

      let crudManager = new CrudManager();

      //check for existing user
      let isExisting = await crudManager.checkExistingUser(this.username);

      //register
      if (!isExisting) {
        const data = {
          username: this.username,
          password: this.password,
          fullName: this.full_name,
          email: this.email,
          status: "novokreiran",
          role_id: 1,
          isActive: false,
        };
        await this.$store.dispatch("addUser", data);
      } else {
        alert(`Username alerady exists!`);
        return;
      }

      //redirect
      this.$router.push("/loginRegistration/login");
      return;
    },
  },
};
</script>

<style>
</style>