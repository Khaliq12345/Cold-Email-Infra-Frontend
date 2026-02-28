// middleware/auth.global.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  const appStore = useAppStore();

  // 1. Array of paths that should NEVER trigger a redirect to login
  const publicPaths = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ];

  // 2. Priority Check: If page has skipAuth meta OR is a public path, let them through
  if (to.meta?.skipAuth || publicPaths.includes(to.path)) {
    // Optimization: If a user IS logged in and tries to go to login/signup,
    // send them to the dashboard instead.
    if (appStore.user && publicPaths.includes(to.path)) {
      return navigateTo("/domains");
    }
    return;
  }

  // 3. Final Check: If no user in store, redirect to login
  if (!appStore.user) {
    console.warn("Unauthorized access attempt to:", to.path);
    return navigateTo("/login");
  }
});
