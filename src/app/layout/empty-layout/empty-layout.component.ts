import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'empty-layout',
  template: `<router-outlet></router-outlet>`,
})
export class EmptyLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}
