// Define a generic Handler type that accepts a request and additional arguments
export type Handler<T = any> = (req: Request, args: T) => Promise<Response>;

const withAuthentication = <T = any>(handler: Handler<T>): Handler<T> => {
  return async (req: Request, args: T): Promise<Response> => {
    console.log('no need for api service????')
    const internalApiKey = process.env.AUTH_KEY;
    const requestApiKey = req.headers.get('x-internal-api-key');

    if (requestApiKey !== internalApiKey) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Call the original handler if authentication passes
    return handler(req, args);
  };
};

export default withAuthentication;

export const config = {
  matcher: ['/api/:path*'],
};