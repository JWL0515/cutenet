import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalService } from '../services/local.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localservice = inject(LocalService);
  if(localservice){
    if(localservice.getData("token") != null){
      return true;
    }
    else{
      router.navigateByUrl("user/login");
      return false;
    }
  }
  else{
    return false;
  }
  
};
