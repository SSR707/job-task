import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserRole } from '../enums';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.user?.role || req.user?.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Forbidden user');
    } else {
      return true;
    }
  }
}
