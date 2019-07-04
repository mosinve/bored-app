import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vuetify from "vuetify";
import PageActivitiesList from "@/views/PageActivitiesList";
const localVue = createLocalVue();

const activityMock = {
  activity: "Learn Express.js",
  accessibility: 0.25,
  type: "education",
  participants: 1,
  price: 0.1,
  link: "https://expressjs.com/",
  key: "3943506"
};

localVue.use(Vuex);
localVue.use(Vuetify, {
  iconfont: "fa"
});

describe("PageActivitiesList.vue", () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      loadActivity: jest.fn(),
      saveActivityToList: jest.fn()
    };
    store = new Vuex.Store({
      state: {
        activity: activityMock
      },
      actions
    });
  });

  it("Component renders", () => {
    const wrapper = shallowMount(PageActivitiesList, { store, localVue });

    expect(wrapper.isVueInstance()).toBe(true);
  });
});
