<template>
  <div>
    <Header />
    <div class="py-10">
      <header>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight text-black">
            {{ selectedMachine.name }}
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
                    {{ selectedMachine.id }}
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
                    {{ selectedMachine.name }}
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
                    {{ selectedMachine.description }}
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
                    State
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
                    {{ selectedMachine.state }}
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
                    {{ selectedMachine.created_at }}
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
                    {{ selectedMachine.updated_at }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
      <div class="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button class="button" @click="updateMachine($event)">Update</button>
        <button class="button buttonRed" @click="deleteMachine($event)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "~/components/Header";
import { formatDate } from "~/components/helper/formatter.js";

export default {
  components: {
    Header,
  },
  data() {
    return {
      machine: {},
    };
  },
  async created() {
    await this.$store.dispatch("addLog", {
      action: `GET: /machines/${this.$route.params.id}`,
      userId: this.$auth.user.id,
    });
  },
  beforeMount() {
    if (!this.$auth.loggedIn) {
      alert("You must be logged in! Redirecting to login page...");
      this.$router.push("/loginRegistration/login");
    }
  },
  computed: {
    selectedMachine() {
      const mchn = {
        ...this.$store.getters["getMachine"](this.$route.params.id),
      };
      mchn.created_at = formatDate(mchn.created_at);
      mchn.updated_at = formatDate(mchn.updated_at);
      return mchn;
    },
  },
  methods: {
    async updateMachine(e) {
      e.preventDefault();
      this.$router.push(`../machines/${this.selectedMachine.id}/edit`);
      return;
    },
    async deleteMachine(e) {
      e.preventDefault();
      await this.$store.dispatch("removeMachine", this.selectedMachine.id);
      await this.$store.dispatch("addLog", {
        action: `DELETE: machines/${this.selectedMachine.id}`,
        userId: this.$auth.user.id,
      });
      this.$router.push(`../machines`);
      return;
    },
  },
};
</script>

<style>
</style>