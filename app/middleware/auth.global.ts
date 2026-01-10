export default defineNuxtRouteMiddleware((to, from) => {
  if (to.meta?.skipAuth) return;
  const appStore = useAppStore();
  if (!appStore.user) {
    console.log("Auth user failed");
    return navigateTo("/login");
  }
  console.log("Auth user passed");
});
