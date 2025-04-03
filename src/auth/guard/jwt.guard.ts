import { AuthGuard } from '@nestjs/passport';

// This guard is used to protect routes that require JWT authentication
// It extends the AuthGuard from NestJS Passport and uses the 'jwt' strategy defined in the JwtStrategy class
// The guard will automatically check for a valid JWT token in the request headers and validate it using the JwtStrategy
// If the token is valid, the request will be allowed to proceed to the route handler
// If the token is invalid or missing, the guard will return a 401 Unauthorized response
class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
export { JwtGuard };
