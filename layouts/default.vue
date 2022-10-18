<template>
  <v-app style="background-color: #e3e3e3">
    <v-app-bar app dense elevation="4" color="white" class="d-flex justify-center">
      <v-toolbar-title>PESCA DEL DIA</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer dark :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      fixed: false,
    }
  },
}
</script>
