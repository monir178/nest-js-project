import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {

    const apiKey = req.headers['x-api-key'];

    if (apiKey !== 'secret-key-123') {
      throw new UnauthorizedException('Invalid API key');
    }

    next();
  }
}
