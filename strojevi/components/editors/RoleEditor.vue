<template>
  <div>
    <div v-if="roleForUpdate" class="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
      <form action="/" :method="method">
        <div class="shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 bg-white sm:p-6">
            <div class="grid grid-cols-5 gap-2">
              <div class="col-span-3">
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700"
                  >Name</label
                >
                <input
                  type="text"
                  key="name"
                  name="name"
                  id="name"
                  v-model="role.name"
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
                  for="description"
                  class="block text-sm font-medium text-gray-700"
                  >Description</label
                >
                <input
                  type="text"
                  key="description"
                  name="description"
                  id="description"
                  v-model="role.description"
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
  name: "RoleEditor",
  data() {
    return {
      role: {},
    };
  },
  computed: {
    roleForUpdate() {
      this.role.id = this.$route.params.id;
      this.role.name = this.name;
      this.role.description = this.description;
      return this.role;
    },
  },
  props: {
    action: String,
    method: String,
    name: String,
    description: String,
  },
  methods: {
    async onClick(e) {
      e.preventDefault();
      let path = "";
      if (this.method == "POST") {
        await this.$store.dispatch("addRole", this.role);
        await this.$store.dispatch("addLog", {
          action: `PUT: /roles`,
          userId: this.$auth.user.id,
        });
        path = "../roles";
      } else if (this.method == "PUT") {
        await this.$store.dispatch("updateRole", this.role);
        await this.$store.dispatch("addLog", {
          action: `PUT: /roles/${this.role.id}`,
          userId: this.$auth.user.id,
        });
        path = "../../roles";
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