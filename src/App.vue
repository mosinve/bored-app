<template>
  <v-app>
    <v-toolbar app tabs dense>
      <v-toolbar-title class="headline text-uppercase">
        <span>Bored?</span>
        <span class="font-weight-thin">No more!</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn :to="{ name: 'Activity' }" append exact flat>
          Activity
        </v-btn>
        <v-btn :to="{ name: 'Activities' }" append flat>
          My List
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>
