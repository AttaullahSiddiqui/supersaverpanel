import { Component, AfterViewInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../_nav';
import { Router } from "@angular/router";
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewInit {

  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor(private router: Router, private _utlityService: UtilityService, @Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  ngAfterViewInit() {
    // var element = document.getElementsByClassName('stopOpen')[0];
    // document.querySelector('.stopOpen').click()
    // let element: HTMLElement = document.getElementsByClassName('stopOpen')[0] as HTMLElement;
    // element.click();
    for (var i = 0; i < 6; i++) {
      (<HTMLElement>document.getElementsByClassName('stop')[i]).classList.remove('open')
    }
    (<HTMLElement>document.getElementsByClassName('navbar-toggler')[2]).classList.remove('d-lg-block');
    // (<HTMLElement>document.getElementsByClassName('navbar-toggler')[3]).classList.add('hideIt');
    // (<HTMLElement>document.getElementsByClassName('navbar-toggler')[4]).classList.add('hideIt');
  }

  logUserOut() {
    this._utlityService.removeToken();
    this.router.navigateByUrl('/login')
  }
}
