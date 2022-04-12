<template>
  <div>
    <Header />
    <UserEditor
      v-if="isAdmin() || isCurrentUser()"
      :method="'PUT'"
      :username="user.username"
      :full_name="user.full_name"
      :email="user.email"
      :role_id="user.role_id"
      :status="user.status"
    />
  </div>
</template>

<script>
import UserEditor from "~/components/editors/userEditor";
import { UserRoles } from "~/components/enums/UserRole";
import Header from "~/components/Header";

export default {
  components: {
    UserEditor,
    Header,
  },
  data() {
    return {
      user: {
        username: "",
        full_name: "",
        email: "",
        role_id: 1,
        status: "",
      },
    };
  },
  beforeMount() {
    if (!this.isAdmin() && !this.isCurrentUser()) {
      alert("You don't have authority for this page!");
      this.$router.push("/");
      return;
    }
  },
  async created() {
    this.user = this.$store.getters["getUser"](this.$route.params.id);
  },
  methods: {
    isAdmin() {
      return this.$auth.user.role_id == UserRoles.Administrator;
    },
    isCurrentUser() {
      return this.$auth.user.id == this.$router.params.id;
    },
  },
};
</script>

<style>
</style>