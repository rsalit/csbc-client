import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

class MenuItem {
  routerLink: string;
  description: string;
}
const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})


export class AdminComponent  implements OnInit {
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  opened: true;
  mode = 'side';
  menuItems: MenuItem[];
  private mediaMatcher: MediaQueryList = matchMedia(
    `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
  );

  constructor(zone: NgZone, private router: Router) {
    this.mediaMatcher.addListener(mql =>
      zone.run(() => (this.mediaMatcher = mql))
    );

  }
  ngOnInit() {
    // this.userService.isLoggedIn.subscribe(f => {
    //   console.log(f);
    //   this.isLoggedin = f;
    //   this.router.navigate(['/login']);
    // });

    // this.user = this.userService.user;
    // TODO: get user types!
    this.menu();
  }
    menu() {
    this.menuItems = new Array<MenuItem>();

    this.menuItems.push({
      routerLink: '/admin/seasons',
      description: 'Seasons'
    });
    this.menuItems.push({
      routerLink: '/admin/division',
      description: 'Divisions'
    });
    this.menuItems.push({
      routerLink: '/admin/content',
      description: 'Front Page Content'
    });
  }
}
