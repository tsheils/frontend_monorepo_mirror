import {Component, Input, OnInit} from '@angular/core';
import {slideInOutAnimation} from "./header-animations";
import {ActivatedRoute} from "@angular/router";

export class LinkTemplateProperty {
  link: string;
  label?: string;
}


@Component({
  selector: 'ncats-frontend-library-header-template',
  templateUrl: './header-template.component.html',
  styleUrls: ['./header-template.component.scss'],
  animations: [slideInOutAnimation]

})
export class HeaderTemplateComponent implements OnInit {

  /**
   * animation state changed by scrolling
   * @type {string}
   */
  @Input() animationState = 'in';

  @Input() title: string = 'GARD Mapper';

  @Input() links: LinkTemplateProperty[] = [];
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  /**
   * sets active section in nav
   * @param path
   */
  isActive(path: string): boolean {
    if (this.route.snapshot.data && this.route.snapshot.data.path) {
      return path === this.route.snapshot.data.path;
    } else if (this.route.snapshot.url && this.route.snapshot.url.length > 0 ) {
      return path === this.route.snapshot.url[0].path;
    } else {
      return false;
    }
  }

}
