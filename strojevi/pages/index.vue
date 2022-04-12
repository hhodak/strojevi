<template>
  <div>
    <Header />
    <img
      class="object-cover basis-0 w-full"
      src="https://thefilibusterblog.com/wp-content/uploads/2021/06/dd0214ed42_50167254_machine-mr-twister-fotolia.jpg"
      alt="Workflow"
    />
  </div>
</template>

<script>
import Header from "~/components/Header";

export default {
  components: {
    Header,
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