import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UsersService } from 'src/Services/users.service';

export const adminauthenticationGuard: CanActivateFn = (route, state) => {
  var result=inject(UsersService).admin;
  return result;
};
