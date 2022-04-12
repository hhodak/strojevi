<template>
  <div>
    <div v-if="userForUpdate" class="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
      <form action="/" :method="method">
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
                  v-model="user.username"
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
                  v-model="user.full_name"
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
                  v-model="user.email"
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
                  for="status"
                  class="block text-sm font-medium text-gray-700"
                  >Status</label
                >
                <input
                  type="text"
                  key="status"
                  name="status"
                  id="status"
                  v-model="user.status"
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
                  for="role"
                  class="block text-sm font-medium text-gray-700"
                  >Role</label
                >
                <select
                  key="role"
                  name="role"
                  id="role"
                  class="
                    z-10
                    mt-1
                    w-full
                    bg-white
                    shadow-md shadow-black
                    max-h-56
                    rounded-md
                    py-1
                    text-base
                    ring-1 ring-black ring-opacity-5
                    overflow-auto
                    focus:outline-none
                    sm:text-sm
                  "
                  v-model="user.role_id"
                >
                  <option
                    v-for="role in this.userRoles"
                    v-bind:value="role.id"
                    :key="role.id"
                  >
                    {{ role.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="px-3 py-4">
              <button type="submit" class="button" @click="onClick($event)">
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserEditor",
  props: {
    action: String,
    method: String,
    username: String,
    full_name: String,
    email: String,
    role_id: Number,
    status: String,
  },
  data() {
    return {
      user: {},
    };
  },
  computed: {
    userForUpdate() {
      this.user.id = this.$route.params.id;
      this.user.username = this.username;
      this.user.full_name = this.full_name;
      this.user.email = this.email;
      this.user.role_id = this.role_id;
      this.user.status = this.status;
      return this.user;
    },
    userRoles() {
      return this.$store.getters["getRoles"];
    },
  },
  methods: {
    async onClick(e) {
      e.preventDefault();
      let path = "";
      if (this.method == "PUT") {
        await this.$store.dispatch("updateUser", this.user);
        await this.$store.dispatch("addLog", {
          action: `PUT: /users/${this.user.id}`,
          userId: this.$auth.user.id,
        });
        path = "../../users";
      } else {
        console.log("Mistake has occured...");
      }
      this.$router.push(path);
      return;
    },
  },
};
</script>

<style>
</style>