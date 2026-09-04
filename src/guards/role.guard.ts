import {
  CanActivate, ExecutionContext, Injectable, UnauthorizedException
} from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const role = request.headers['role'];
    if (role !== 'admin') {
      throw new UnauthorizedException('You are not authorized to access this resource');
    }
    return true;
  }
}
