import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler';

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false;

addEventListener('fetch', (event) => {
  try {
    event.respondWith(handleEvent(event));
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      );
    }
    event.respondWith(new Response('Internal Error', { status: 500 }));
  }
});

/**
 * Respond with an asset from KV or fallback to index.html for SPA routes
 */
async function handleEvent(event) {
  const url = new URL(event.request.url);
  let options = {};

  try {
    // Try to get the asset from KV
    const page = await getAssetFromKV(event, options);
    
    // Allow headers to be altered
    const response = new Response(page.body, page);
    
    // Cache according to the asset's cache control headers
    response.headers.set('Cache-Control', 'public, max-age=3600');
    
    return response;
  } catch (e) {
    // If an error is thrown, return the index.html for SPA routing
    try {
      const notFoundResponse = await getAssetFromKV(event, {
        mapRequestToAsset: (req) => {
          return new Request(`${new URL(req.url).origin}/index.html`, req);
        },
      });
      
      return new Response(notFoundResponse.body, {
        ...notFoundResponse,
        status: 200, // Important: return 200 instead of 404
      });
    } catch (e) {
      return new Response('Not Found', { status: 404 });
    }
  }
}
