import { render, cleanup, fireEvent } from "@testing-library/vue";
import PrimeVue from "primevue/config";
import HomeView from "@/views/HomeView.vue";
import { describe, it, expect, afterEach, vi } from "vitest";
import { createRouter, createWebHistory } from "vue-router";

describe("Testing HomeView.vue", () => {
  afterEach(() => {
    cleanup();
  });

  const configTest = (component: any) => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: "/",
          name: "Home",
          component: component,
        },
      ],
    });
    Object.defineProperty(router, "push", {
      value: vi.fn(),
      writable: true,
    });
    const renderView = render(component, {
      global: {
        plugins: [PrimeVue, router],
      },
    });
    return { renderView, router };
  };

  it("Test renders home view", async () => {
    const { renderView, router } = configTest(HomeView);
    const { findByTestId } = renderView;

    const homeView = await findByTestId("home-view");

    expect(homeView).toBeDefined();
    const button = await findByTestId("started-button");
    await fireEvent.click(button);

    expect(router.push).toHaveBeenCalledWith("/pokemon");
    expect(router.push).toHaveBeenCalledTimes(1);
  });
});
