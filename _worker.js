export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Check if the request is for a static asset
    if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) {
      return fetch(request);
    }
    
    try {
      // Try to get the requested URL directly
      const response = await fetch(request);
      if (response.status < 400) {
        return response;
      }
    } catch (e) {
      // Fall through to returning the index.html
    }
    
    // If we get here, return the index.html for SPA routing
    const indexUrl = new URL('/', url);
    return fetch(new Request(indexUrl, request));
  }
}
