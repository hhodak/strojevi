<template>
  <div>
    <Header />
    <div class="py-10">
      <header>
        <div
          class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between"
        >
          <h1 class="text-3xl font-bold leading-tight text-gray-900">
            ☸ Machines
          </h1>
          <nuxt-link to="machines/newMachine" class="button buttonGreen">
            Create new machine</nuxt-link
          >
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
          <div class="bg-white shadow overflow-hidden sm:rounded-md">
            <ul>
              <li
                v-for="machine in machines"
                :key="machine.id"
                class="flex justify-between m-3 border p-5 rounded"
              >
                <div class="w-3/4">
                  <nuxt-link
                    :to="`machines/${machine.id}`"
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
                              {{ machine.name }}
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
                              {{ machine.id }} | {{ machine.state }}
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
                              {{ machine.description }}
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
                  <button
                    class="button buttonRed"
                    @click="deleteMachine(machine.id)"
                  >
                    Delete
                  </button>
                  <nuxt-link :to="`machines/${machine.id}/edit`" class="button"
                    >Update</nuxt-link
                  >
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
import Header from "~/components/Header";

export default {
  components: {
    Header,
  },
  computed: {
    machines() {
      return this.$store.getters["getMachines"];
    },
  },
  beforeMount() {
    if (!this.$auth.loggedIn) {
      alert("You must be logged in! Redirecting to login page...");
      this.$router.push("/loginRegistration/login");
    }
  },
  async created() {
    await this.$store.dispatch("addLog", {
      action: `GET: machines/}`,
      userId: this.$auth.user.id,
    });
  },
  methods: {
    async deleteMachine(machineId) {
      await this.$store.dispatch("removeMachine", machineId);
      await this.$store.dispatch("addLog", {
        action: `DELETE: machines/${machineId}`,
        userId: this.$auth.user.id,
      });
      this.machines = this.$store.getters["getMachines"];
    },
  },
};
</script>

<style>
</style>