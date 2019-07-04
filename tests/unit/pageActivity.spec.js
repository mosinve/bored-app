import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vuetify from "vuetify";
import PageActivity from "@/views/PageActivity";
import { Activity } from "@/models/Activity";
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

describe("PageActivity.vue", () => {
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
    const wrapper = shallowMount(PageActivity, { store, localVue });

    expect(wrapper.isVueInstance()).toBe(true);
  });

  it("Make call to API endpoint upon creation", () => {
    shallowMount(PageActivity, { store, localVue });

    expect(actions.loadActivity).toHaveBeenCalled();
  });

  it("Fill form with received data", async done => {
    const wrapper = await shallowMount(PageActivity, { store, localVue });

    localVue.nextTick(() => {
      expect(wrapper.vm.activityDetails).toEqual(new Activity(activityMock));
      done();
    });
  });

  it("Make call to API endpoint after changing form", async done => {
    const wrapper = await shallowMount(PageActivity, { store, localVue });

    localVue.nextTick(() => {
      wrapper.vm.activityDetails.participants = 4;
      done();
    });

    localVue.nextTick(() => {
      expect(actions.loadActivity).toHaveBeenCalledTimes(2);
      done();
    });
  });

  it("Saves activity to list", done => {
    const wrapper = shallowMount(PageActivity, { store, localVue });

    localVue.nextTick(() => {
      wrapper.find('[data-test="saveToList"]').trigger("click");

      done();
    });

    localVue.nextTick(() => {
      expect(actions.saveActivityToList).toHaveBeenCalled();
      done();
    });
  });
});
