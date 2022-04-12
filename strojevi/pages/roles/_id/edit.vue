<template>
  <div>
    <Header />
    <RoleEditor v-if="isAdmin()"
      :method="'PUT'"
      :name="role.name"
      :description="role.description"
    />
  </div>
</template>

<script>
import RoleEditor from "~/components/editors/roleEditor";
import { UserRoles } from "~/components/enums/UserRole";
import Header from "~/components/Header";

export default {
  components: {
    RoleEditor,
    Header,
  },
  data() {
    return {
      role: {
        name: "",
        description: "",
      },
    };
  },
  beforeMount() {
    if (!this.isAdmin()) {
      alert("You don't have authority for this page!");
      this.$router.push("/");
      return;
    }
  },
  async created() {
    this.role = this.$store.getters["getRole"](this.$route.params.id);
  },
  methods: {
    isAdmin() {
      return this.$auth.user.role_id == UserRoles.Administrator;
    },
  },
};
</script>

<style>
</style>