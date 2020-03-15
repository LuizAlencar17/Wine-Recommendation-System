<template>
  <v-app>
  <core-filter v-if="(this.$route.name!='Login')"/>

    <core-toolbar v-if="(this.$route.name!='Login')"/>

    <core-drawer v-if="(this.$route.name!='Login')"/>

    <core-view />
  </v-app>
</template>

<style lang="scss">
@import '@/styles/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>
