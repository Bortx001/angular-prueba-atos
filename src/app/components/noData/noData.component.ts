import { Component, OnDestroy, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-data',
  templateUrl: './noData.component.html',
  styleUrls: ['./noData.component.scss']
})

export class AppNoDataComponent implements OnInit, OnDestroy {
  @Input() text: string;

  constructor() {
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
