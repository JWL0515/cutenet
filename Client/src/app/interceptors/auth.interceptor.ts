import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalService } from '../services/local.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localservice = inject(LocalService);
  const token = localservice.getData('token');

  if(token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  } else {
    return next(req);
  }
};
