<template></template>

<script>
export default {
  async created() {
    await this.$store.dispatch("addLog", {
      action: `LOGOUT: ${this.$auth.user.id}`,
      userId: this.$auth.user.id,
    });
    try {
      this.$auth.logout("local", {}).then(() => console.log("Logged Out!"));
    } catch (error) {
      console.log("Neuspjela odjava");
    }
    if (!this.$auth.loggedIn) {
      this.$router.push("../loginRegistration/login");
    }
  },
};
</script>

<style>
</style>