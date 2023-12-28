import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UsersService } from 'src/Services/users.service';
export const userauthenticationGuard: CanActivateFn = (route, state) => {
  var result= inject(UsersService).user;
  return result;
};
