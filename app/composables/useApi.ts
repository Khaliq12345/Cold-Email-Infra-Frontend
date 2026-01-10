import { useAppStore } from "~/stores/app";

export const useApi = async (url: string, opts = {}) => {
  const config = useRuntimeConfig();
  const appStore = useAppStore();

  return await $fetch(url, {
    baseURL: config.public.apiUrl,
    headers: {
      Authorization: appStore?.user?.access_token
        ? `Bearer ${appStore?.user?.access_token}`
        : "",
    },
    ...opts,
  });
};
