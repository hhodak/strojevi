<template>
  <div>
    <Header />
    <div v-if="isAdmin()" class="py-10">
      <header>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight text-black">
            {{ selectedLog.id }}
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
                    {{ selectedLog.id }}
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
                  <dt class="text-sm leading-5 font-medium text-black">User</dt>
                  <dd
                    class="
                      mt-1
                      text-sm
                      leading-5
                      text-black
                      sm:mt-0 sm:col-span-3
                    "
                  >
                    {{ selectedLog.user }}
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
                    Log date/time
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
                    {{ selectedLog.created_at }}
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
                    Action
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
                    {{ selectedLog.action }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
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
      log: {},
    };
  },
  beforeMount() {
    if (!this.isAdmin()) {
      alert("You don't have authority for this page!");
      this.$router.push("/");
      return;
    }
  },
  computed: {
    selectedLog() {
      const tmpLog = {...this.$store.getters["getLog"](this.$route.params.id),};
      tmpLog.created_at = formatDate(tmpLog.created_at);
      tmpLog.updated_at = formatDate(tmpLog.updated_at);
      tmpLog.user = this.getUser(tmpLog.user_id);
      return tmpLog;
    },
  },
  methods: {
    getUser(userId) {
      const user = { ...this.$store.getters["getUser"](userId) };
      return user.username;
    },
    isAdmin() {
      return this.$auth.user.role_id == UserRoles.Administrator;
    },
  },
};
</script>

<style>
</style>