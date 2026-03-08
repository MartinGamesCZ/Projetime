import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ElectronAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const http = context.switchToHttp();
    const req = http.getRequest();

    const secret = process.env.ELECTRON_AUTH_SECRET;
    if (!secret) {
      console.error('INVALID SECRET');

      return false;
    }

    const header = req.headers['x-electron-auth-secret'];
    if (!header) return false;
    if (header != secret) return false;

    return true;
  }
}
