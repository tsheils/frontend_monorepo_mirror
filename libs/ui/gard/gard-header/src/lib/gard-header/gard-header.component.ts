import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ncats-frontend-library-gard-header',
  templateUrl: './gard-header.component.html',
  styleUrls: ['./gard-header.component.scss']
})
export class GardHeaderComponent implements OnInit {

  @Input() links: any[] =  [{link:'mapper'}, {link: 'curation', label: 'curation'}];
 // @Input() links: any[] =  [];

  constructor() { }

  ngOnInit(): void {
  }

}
