import { defineStore } from "pinia";
import type { User } from "~/types/user";

export const useAppStore = defineStore(
  "app",
  () => {
    const user = ref<User | null>(null);

    function getUser(): User | null {
      return user.value;
    }

    function getUsername(): string | undefined {
      return user.value?.user.user_metadata.username;
    }

    function setUser(newUser: User | null) {
      user.value = newUser;
      console.log("User set to:", user.value);
    }

    function logout() {
      setUser(null);
    }

    return { user, getUser, setUser, logout, getUsername };
  },
  {
    persist: true,
  },
);
