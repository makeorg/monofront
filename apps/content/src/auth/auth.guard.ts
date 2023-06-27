import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { ApiService } from '@make.org/api/ApiService';
import { Request } from 'express';
import { UserApiService } from '@make.org/api/services/UserApiService';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger('AuthGuard');
  private readonly requiredRoleList = ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'];

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      ApiService.setToken(token);
      const response = await UserApiService.current();
      if (response) {
        const { data: user } = response;

        request['user'] = user;
        const allowed = !!user?.roles.find((userRole: string) =>
          this.requiredRoleList.includes(userRole),
        );

        if (!allowed) {
          this.logger.warn(
            `User ${user.displayName} (${user.userId}) not authorized to access API`,
          );

          return false;
        }
      }
    } catch (error) {
      const apiServiceError = error as ApiServiceError;
      if (apiServiceError.status === 401) {
        throw new UnauthorizedException();
      }

      this.logger.error(apiServiceError.message);
      throw new InternalServerErrorException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
