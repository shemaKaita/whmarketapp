export async function register() {
  // Enable MSW for all Node.js runtime environments (development and production)
  // This allows the mock API to work during development, build, and production runtime
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Dynamic import to avoid bundling MSW in edge runtime
    const { server } = await import("./src/mockServer");

    server.listen({
      onUnhandledRequest: "bypass",
    });

    console.log("🔶 Mock Service Worker active in Node environment");
  }
}
