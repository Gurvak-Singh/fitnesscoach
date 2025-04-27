export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Check if the request is for a static asset
    if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) {
      // Just return the asset from the static site
      return env.ASSETS.fetch(request);
    }
    
    try {
      // Try to serve the requested path
      const response = await env.ASSETS.fetch(request);
      if (response.status < 400) {
        return response;
      }
    } catch (e) {
      // Fall through to SPA handling
    }
    
    // If we're here, we need to serve the index.html for client-side routing
    return env.ASSETS.fetch(`${url.origin}/index.html`);
  }
}
