export const useApi = async (url: string, opts = {}) => {
  const config = useRuntimeConfig();
  const appStore = useAppStore();

  try {
    return await $fetch(url, {
      baseURL: config.public.apiUrl,
      headers: {
        Authorization: appStore?.user?.access_token
          ? `Bearer ${appStore?.user?.access_token}`
          : "",
      },
      ...opts,
    });
  } catch (err: any) {
    const fetchError = err.data;

    const errorMessage = fetchError?.message || err.message;
    console.log("ERROR MESSAGE:", errorMessage);

    // 3. Logic checks using the extracted message
    if (errorMessage === "Invalid login credentials") {
      throw err; // Re-throw so your login page can catch it and show a toast
    }

    // 4. Handle Unauthorized
    if (err.status === 401) {
      appStore.setUser(null);
      return navigateTo("/login");
    }

    throw err; // Always a good idea to throw the error if it wasn't handled above
  }
};
