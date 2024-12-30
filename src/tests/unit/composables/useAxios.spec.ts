import useAxios from "@/composables/useAxios";
import { describe, it, expect } from "vitest";

describe("useAxios", () => {
  it("should make a successful API call", async () => {
    const { axiosInstance } = useAxios();
    try {
      const response = await axiosInstance.get(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      expect(response).toBeDefined();
    } catch (error) {
      expect(error).toBeNull();
    }
  });

  it("should handle API errors", async () => {
    const { axiosInstance } = useAxios();
    try {
      const response = await axiosInstance.get(
        "https://jsonplaceholder.typicode.com/invalid-url"
      );
      expect(response).toBeNull();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
