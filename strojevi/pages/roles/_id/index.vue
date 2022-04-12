<template>
  <div>
    <Header />
    <div v-if="isAdmin()" class="py-10">
      <header>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight text-black">
            {{ selectedRole.name }}
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
                    {{ selectedRole.id }}
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
                  <dt class="text-sm leading-5 font-medium text-black">Name</dt>
                  <dd
                    class="
                      mt-1
                      text-sm
                      leading-5
                      text-black
                      sm:mt-0 sm:col-span-3
                    "
                  >
                    {{ selectedRole.name }}
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
                    Description
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
                    {{ selectedRole.description }}
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
                    {{ selectedRole.created_at }}
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
                    {{ selectedRole.updated_at }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
      <div class="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button class="button" @click="updateRole($event)">Update</button>
        <button class="button buttonRed" @click="deleteRole($event)">
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
  },
  data() {
    return {
      role: {},
    };
  },
  async created() {
    await this.$store.dispatch("addLog", {
      action: `GET: /roles/${this.$route.params.id}`,
      userId: this.$auth.user.id,
    });
  },
  beforeMount() {
    if (!this.isAdmin()) {
      alert("You don't have authority for this page!");
      this.$router.push("/");
      return;
    }
  },
  computed: {
    selectedRole() {
      const usrRole = {
        ...this.$store.getters["getRole"](this.$route.params.id),
      };
      usrRole.created_at = formatDate(usrRole.created_at);
      usrRole.updated_at = formatDate(usrRole.updated_at);
      return usrRole;
    },
  },
  methods: {
    async updateRole(e) {
      e.preventDefault();
      this.$router.push(`../roles/${this.selectedRole.id}/edit`);
      return;
    },
    async deleteRole(e) {
      e.preventDefault();
      await this.$store.dispatch("removeRole", this.selectedRole.id);
      await this.$store.dispatch("addLog", {
        action: `DELETE: /roles/${this.selectedRole.id}`,
        userId: this.$auth.user.id,
      });
      this.$router.push(`../roles`);
      return;
    },
    isAdmin(){
      return this.$auth.user.role_id == UserRoles.Administrator
    }
  },
};
</script>

<style>
</style>