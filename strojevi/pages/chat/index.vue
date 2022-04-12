<template>
  <ChatApp />
</template>

<script>
import ChatApp from "~/components/chat/ChatApp.vue";

export default {
  name: "Chat",
  components: {
    ChatApp,
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