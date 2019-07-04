<template>
  <v-layout tag="section" justify-center class="pa-4">
    <v-flex sm8 md6>
      <v-card>
        <v-card-title primary-title>
          <h3 class="headline">
            My activities list
          </h3>
        </v-card-title>
        <v-card-text>
          <v-data-table :headers="headers" :items="activitiesList">
            <template v-slot:items="{ item }">
              <td>{{ item.key }}</td>
              <td>{{ item.activity }}</td>
              <td>{{ item.participants }}</td>
              <td>{{ item.price }}</td>
              <td nowrap>
                <v-btn
                  icon
                  :disabled="item.completed"
                  small
                  @click="completeActivity({ ...item, completed: true })"
                >
                  <v-icon color="green">fas fa-check</v-icon>
                </v-btn>
                <v-btn icon small @click="deleteActivity(item)">
                  <v-icon color="error">fas fa-minus</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-btn block color="error" outline @click="clearAll">
            Clear all
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapMutations } from "vuex";

const HEADERS = [
  { text: "#", align: "left", sortable: false, value: "key" },
  { text: "Activity", align: "center", sortable: false, value: "activity" },
  { text: "Participants", value: "participants" },
  { text: "Budget", value: "price" },
  { sortable: false }
];

export default {
  name: "ActivitiesList",
  data: () => ({
    headers: HEADERS
  }),
  computed: {
    ...mapState(["activitiesList"])
  },
  methods: {
    ...mapMutations(["removeFromList", "clearAll", "completeActivity"]),
    deleteActivity(activity) {
      this.removeFromList(activity);
    }
  }
};
</script>
