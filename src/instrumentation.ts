export async function register() {
  // We only want mocks to run in development, and only in the Node.js runtime
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.NODE_ENV === "development"
  ) {
    // Dynamic import to avoid bundling MSW in production code
    const { server } = await import("./mockServer");

    server.listen({
      onUnhandledRequest: "bypass", // 'warn' or 'error' if you want to be strict
    });

    console.log("🔶 Mock Service Worker active in Node environment");
  }
}
