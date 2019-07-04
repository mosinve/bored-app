<template>
  <v-layout v-if="activity" tag="section" justify-center class="pa-4">
    <v-flex sm8 md6>
      <v-card>
        <v-card-title primary-title>
          <h3 class="headline">
            Activity
          </h3>
        </v-card-title>
        <v-card-text>
          <v-layout wrap>
            <v-flex sm6 pa-sm-2 pb-2>
              <h3 class="subheading">
                You should:
              </h3>
              <v-alert v-if="activity.error" value="true">
                {{ activity.error }}
              </v-alert>
              <div v-else class="headline">
                {{ activity.activity }}
              </div>
            </v-flex>
            <v-flex sm6 pa-2>
              <h3 class="subheading">
                Activity details
              </h3>
              <v-form>
                <v-select
                  v-model="activityDetails.type"
                  :items="activityTypes"
                  label="Type"
                  clearable
                ></v-select>
                <v-text-field
                  v-model="activityDetails.participants"
                  data-test="participants"
                  label="Participants"
                ></v-text-field>
                <v-slider
                  v-model.lazy="activityDetails.price"
                  min="0"
                  max="1"
                  step="0.01"
                  append-icon="fas fa-coins"
                  validate-on-blur
                  prepend-icon="far fa-money-bill-alt"
                >
                </v-slider>
              </v-form>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-layout text-xs-center wrap>
            <v-flex sm6>
              <v-btn data-test="saveToList" color="success" @click="save"
                >Save to my list</v-btn
              >
            </v-flex>
            <v-flex sm6>
              <v-btn color="info" @click="getNewActivity">
                Give me another one
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { Activity } from "@/models/Activity";
import { mapState, mapActions } from "vuex";

const activityTypes = [
  "education",
  "recreational",
  "social",
  "diy",
  "charity",
  "cooking",
  "relaxation",
  "music",
  "busywork"
];

export default {
  name: "PageActivity",
  data: () => ({
    activityDetails: {},
    activityTypes
  }),
  computed: {
    ...mapState(["activity"])
  },
  watch: {
    activityDetails: {
      deep: true,
      handler(val, oldVal) {
        if (Object.values(oldVal).every(value => !value)) return;
        this.loadActivity(val);
      }
    }
  },
  created() {
    this.loadActivity().then(() => {
      this.activityDetails = new Activity(this.activity);
    });
  },
  methods: {
    ...mapActions(["loadActivity", "saveActivityToList"]),
    getNewActivity() {
      this.loadActivity(this.activityDetails);
    },
    async save() {
      try {
        await this.saveActivityToList();
      } catch (e) {
        this.$toasted.error(e);
      }
    }
  }
};
</script>
