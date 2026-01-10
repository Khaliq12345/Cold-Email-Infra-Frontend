import { defineStore } from "pinia";
import type { User } from "~/types/user";

export const useAppStore = defineStore(
  "app",
  () => {
    const user = ref<User | null>(null);

    function getUser(): User | null {
      return user.value;
    }

    function setUser(newUser: User | null) {
      user.value = newUser;
      console.log("User set to:", user.value);
    }

    function logout() {
      setUser(null);
    }
    return { user, getUser, setUser, logout };
  },
  {
    persist: true
  }
);
