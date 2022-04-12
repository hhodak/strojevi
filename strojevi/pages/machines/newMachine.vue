<template>
  <div>
    <Header />
    <MachineEditor
      :method="'POST'"
      :machineName="machine.name"
      :machineDescription="machine.description"
      :machineState="machine.state"
    />
  </div>
</template>

<script>
import MachineEditor from "~/components/editors/MachineEditor";
import Header from "~/components/Header";

export default {
  components: {
    MachineEditor,
    Header,
  },
  data() {
    return {
      machine: {
        name: "",
        description: "",
        state: "",
      },
    };
  },
  beforeMount() {
    if (!this.$auth.loggedIn) {
      alert("You must be logged in! Redirecting to login page...");
      this.$router.push("/loginRegistration/login");
    }
  },
};
</script>

<style>
</style>