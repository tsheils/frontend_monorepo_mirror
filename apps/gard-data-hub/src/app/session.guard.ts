import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(
    private dialog: MatDialog,
    private router: Router,
   // public connectionService: Neo4jConnectService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    //return this.checkLogin(url);
    return true;
  }

//  checkLogin(url: string): Observable<boolean> {
  /*  return this.connectionService.session$
      .pipe(
        map( res => {
          if (res) {
            return true;
          } else {
            const dialogRef = this.dialog.open(Neo4jConnectionFormComponent, {
                height: '75vh',
                width: '66vw',
                data: {
                  questions: QUESTIONS
                }
              }
            );

            dialogRef.componentInstance.formValues.subscribe(res=> {
              if (res) {
                this.connectionService.connect(res).subscribe(response => {
                  if (response) {
                    dialogRef.close();
                    this.router.navigate([url]);
                    return true;
                  } else {
                    dialogRef.close();
                    return false;
                  }
                });
              } else {
                return false;
              }
            });
          }
        })
      )
      ;
  }*/
}
