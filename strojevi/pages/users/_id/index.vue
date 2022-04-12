<template>
  <div>
    <Header />
    <div v-if="isAdmin() || isCurrentUser()" class="py-10">
      <header>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight text-black">
            {{ selectedUser.username }}
          </h1>
        </div>
      </header>
      <main>
        <div class="flex max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
          <div class="px-12 max-w-5xl">
            <div>
              <dl>
                <div class="sm:grid sm:grid-cols-8 sm:gap-4">
                  <dt class="text-sm leading-5 font-medium text-black">ID</dt>
                  <dd
                    class="
                      mt-1
                      text-sm
                      leading-5
                      text-black
                      sm:mt-0 sm:col-span-3
                    "
                  >
                    {{ selectedUser.id }}
                  </dd>
                </div>
                <div
                  class="
                    mt-8
                    sm:grid
                    sm:mt-5
                    sm:grid-cols-8
                    sm:gap-4
                    sm:border-t
                    sm:border-gray-200
                    sm:pt-5
                  "
                >
                  <dt class="text-sm leading-5 font-medium text-black">
                    Username
                  </dt>
                  <dd
                    class="
                      mt-1
                      text-sm
                      leading-5
                      text-black
                      sm:mt-0 sm:col-span-3
                    "
                  >
                    {{ selectedUser.username }}
                  </dd>
                </div>
                <div
                  class="
                    mt-8
                    sm:grid
                    sm:mt-5
                    sm:grid-cols-8
                    sm:gap-4
                    sm:border-t
                    sm:border-gray-200
                    sm:pt-5
                  "
                >
                  <dt class="text-sm leading-5 font-medium text-black">
                    Full name
                  </dt>
                  <dd
                    class="
                      mt-1
                      text-sm
                      leading-5
                      text-black
                      sm:mt-0 sm:col-span-3
                    "
                  >
                    {{ selectedUser.full_name }}
                  </dd>
                </div>
                <div
                  class="
                    mt-8
                    sm:grid
                    sm:mt-5
                    sm:grid-cols-8
                    sm:gap-4
                    sm:border-t
                    sm:border-gray-200
                    sm:pt-5
                  "
                >
                  <dt class="text-sm leading-5 font-medium text-black">
                    E-mail
                  </dt>
                  <dd
                    class="
                      mt-1
                      text-sm
                      leading-5
                      text-black
                      sm:mt-0 sm:col-span-3
                    "
                  >
                    {{ selectedUser.email }}
                  </dd>
                </div>
                <div
                  class="
                    mt-8
                    sm:grid
                    sm:mt-5
                    sm:grid-cols-8
                    sm:gap-4
                    sm:border-t
                    sm:border-gray-200
                    sm:pt-5
                  "
                >
                  <dt class="text-sm leading-5 font-medium text-black">
                    Status
                  </dt>
                  <dd
                    class="
                      mt-1
                      text-sm
                      leading-5
                      text-black
                      sm:mt-0 sm:col-span-3
                    "
                  >
                    {{ selectedUser.status }}
                  </dd>
                </div>
                <div
                  class="
                    mt-8
                    sm:grid
                    sm:mt-5
                    sm:grid-cols-8
                    sm:gap-4
                    sm:border-t
                    sm:border-gray-200
                    sm:pt-5
                  "
                >
                  <dt class="text-sm leading-5 font-medium text-black">Role</dt>
                  <dd
                    class="
                      mt-1
                      text-sm
                      leading-5
                      text-black
                      sm:mt-0 sm:col-span-3
                    "
                  >
                    {{ selectedUser.role }}
                  </dd>
                </div>
                <div
                  class="
                    mt-8
                    sm:grid
                    sm:mt-5
                    sm:grid-cols-8
                    sm:gap-4
                    sm:border-t
                    sm:border-gray-200
                    sm:pt-5
                  "
                >
                  <dt class="text-sm leading-5 font-medium text-black">
                    Is active?
                  </dt>
                  <dd
                    class="
                      mt-1
                      text-sm
                      leading-5
                      text-black
                      sm:mt-0 sm:col-span-3
                    "
                  >
                    {{ selectedUser.is_active }}
                  </dd>
                </div>
                <div
                  class="
                    mt-8
                    sm:grid
                    sm:mt-5
                    sm:grid-cols-8
                    sm:gap-4
                    sm:border-t
                    sm:border-gray-200
                    sm:pt-5
                  "
                >
                  <dt class="text-sm leading-5 font-medium text-black">
                    Created at
                  </dt>
                  <dd
                    class="
                      mt-1
                      text-sm
                      leading-5
                      text-black
                      sm:mt-0 sm:col-span-3
                    "
                  >
                    {{ selectedUser.created_at }}
                  </dd>
                </div>
                <div
                  class="
                    mt-8
                    sm:grid
                    sm:mt-5
                    sm:grid-cols-8
                    sm:gap-4
                    sm:border-t
                    sm:border-gray-200
                    sm:pt-5
                  "
                >
                  <dt class="text-sm leading-5 font-medium text-black">
                    Updated at
                  </dt>
                  <dd
                    class="
                      mt-1
                      text-sm
                      leading-5
                      text-black
                      sm:mt-0 sm:col-span-3
                    "
                  >
                    {{ selectedUser.updated_at }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
      <div class="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button class="button" @click="updateUser($event)">Update</button>
        <button class="button buttonRed" @click="deleteUser($event)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { UserRoles } from '~/components/enums/UserRole';
import Header from "~/components/Header";
import { formatDate } from "~/components/helper/formatter.js";

export default {
  components: {
    Header,
    formatDate,
  },
  data() {
    return {
      user: {},
    };
  },
  async created() {
    await this.$store.dispatch("addLog", {
      action: `GET: /users/${this.$route.params.id}`,
      userId: this.$auth.user.id,
    });
  },
  computed: {
    selectedUser() {
      const usr = { ...this.$store.getters["getUser"](this.$route.params.id) };
      usr.created_at = formatDate(usr.created_at);
      usr.updated_at = formatDate(usr.updated_at);
      usr.role = this.getUserRole(usr.role_id);
      return usr;
    },
  },
  beforeMount() {
    if (!this.isAdmin() && !this.isCurrentUser()) {
      alert("You don't have authority for this page!");
      this.$router.push("/");
      return;
    }
  },
  methods: {
    getUserRole(roleId) {
      const role = { ...this.$store.getters["getRole"](roleId) };
      return role.name;
    },
    async updateUser(e) {
      e.preventDefault();
      this.$router.push(`../users/${this.selectedUser.id}/edit`);
      return;
    },
    async deleteUser(e) {
      e.preventDefault();
      await this.$store.dispatch("removeUser", this.selectedUser.id);
      await this.$store.dispatch("addLog", {
        action: `DELETE: /users/${this.selectedUser.id}`,
        userId: this.$auth.user.id,
      });
      this.$router.push(`../users`);
      return;
    },
    isAdmin() {
      return this.$auth.user.role_id==UserRoles.Administrator
    },
    isCurrentUser() {
      return this.$auth.user.id==this.$route.params.id
    }
  },
};
</script>

<style>
</style>