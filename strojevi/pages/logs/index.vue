<template>
  <div>
    <Header />
    <div v-if="isAdmin()" class="py-10">
      <header>
        <div
          class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between"
        >
          <h1 class="text-3xl font-bold leading-tight text-gray-900">✎ Logs</h1>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
          <div class="bg-white shadow overflow-hidden sm:rounded-md">
            <ul>
              <li
                v-for="log in logs"
                :key="log.id"
                class="flex justify-between m-3 border p-5 rounded"
              >
                <div class="w-3/4">
                  <nuxt-link
                    :to="`logs/${log.id}`"
                    class="
                      block
                      hover:bg-gray-50
                      focus:outline-none focus:bg-gray-50
                      transition
                      duration-150
                      ease-in-out
                    "
                  >
                    <div class="flex items-center px-4 py-4 sm:px-6">
                      <div class="min-w-0 flex-1 flex items-center">
                        <div
                          class="
                            min-w-0
                            flex-1
                            px-4
                            md:grid md:grid-cols-2 md:gap-4
                          "
                        >
                          <div>
                            <div
                              class="
                                text-sm
                                leading-5
                                font-medium
                                text-indigo-600
                                truncate
                              "
                            >
                              {{ log.id }}
                            </div>
                            <div
                              class="
                                mt-2
                                flex
                                items-center
                                text-sm
                                leading-5
                                text-gray-700
                              "
                            >
                              {{ log.user_id }} | {{ log.created_at }}
                            </div>
                          </div>
                          <div class="hidden md:block">
                            <div
                              class="
                                mt-2
                                flex
                                items-center
                                text-sm
                                leading-5
                                text-gray-600
                                truncate
                                ...
                              "
                            >
                              {{ log.action }}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <svg
                          class="h-5 w-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </nuxt-link>
                </div>
                <div class="mx-0 my-auto">
                  <button class="button buttonRed" @click="removeLog(log.id)">
                    Delete
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { UserRoles } from "~/components/enums/UserRole";
import Header from "~/components/Header";

export default {
  components: {
    Header,
  },
  computed: {
    logs() {
      return this.$store.getters["getLogs"];
    },
  },
  beforeMount() {
    if (!this.isAdmin()) {
      alert("You don't have authority for this page!");
      this.$router.push("/");
      return;
    }
  },
  methods: {
    async removeLog(logId) {
      await this.$store.dispatch("removeLog", logId);
      this.machines = this.$store.getters["getLogs"];
    },
    isAdmin() {
      return this.$auth.user.role_id == UserRoles.Administrator;
    },
  },
};
</script>

<style>
</style>