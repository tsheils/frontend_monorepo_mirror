import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ncats-frontend-library-gard-header',
  templateUrl: './gard-header.component.html',
  styleUrls: ['./gard-header.component.scss']
})
export class GardHeaderComponent implements OnInit {

/*
  @Input() links: any[] =  [{link:'target'}, {link: 'api', label: 'API'}];
*/
  @Input() links: any[] =  [];

  constructor() { }

  ngOnInit(): void {
  }

}
