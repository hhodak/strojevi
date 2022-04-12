<template>
  <div>
    <Header />
    <RoleEditor
      :method="'POST'"
      :name="role.name"
      :description="role.description"
    />
  </div>
</template>

<script>
import RoleEditor from "~/components/editors/RoleEditor";
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
};
</script>

<style>
</style>