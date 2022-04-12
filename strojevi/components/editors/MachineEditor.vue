<template>
  <div v-if="machineForUpdate" class="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
    <form action="/" :method="method">
      <div class="shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 bg-white sm:p-6">
          <div class="grid grid-cols-6 gap-2">
            <div class="col-span-2">
              <label for="name" class="block text-sm font-medium text-gray-700"
                >Name</label
              >
              <input
                type="text"
                key="name"
                name="name"
                id="name"
                v-model="machine.name"
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

            <div class="col-span-2">
              <label for="state" class="block text-sm font-medium text-gray-700"
                >State</label
              >
              <input
                type="text"
                key="state"
                name="state"
                id="state"
                v-model="machine.state"
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

            <div class="col-span-4">
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
                v-model="machine.description"
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
</template>

<script>
export default {
  name: "MachineEditor",
  data() {
    return {
      machine: {},
    };
  },
  computed: {
    machineForUpdate() {
      this.machine.id = this.$route.params.id;
      this.machine.name = this.machineName;
      this.machine.description = this.machineDescription;
      this.machine.state = this.machineState;
      return this.machine;
    },
  },
  props: {
    method: String,
    machineName: String,
    machineDescription: String,
    machineState: String,
  },
  methods: {
    async onClick(e) {
      e.preventDefault();
      let path = "";
      if (this.method == "POST") {
        await this.$store.dispatch("addMachine", this.machine);
        await this.$store.dispatch("addLog", {
          action: `POST: /machines`,
          userId: this.$auth.user.id,
        });
        path = "../machines";
      } else if (this.method == "PUT") {
        await this.$store.dispatch("updateMachine", this.machine);
        await this.$store.dispatch("addLog", {
          action: `PUT: /machines/${this.machine.id}`,
          userId: this.$auth.user.id,
        });
        path = "../../machines";
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