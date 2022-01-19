import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent {
  public sort!: any;
  public name!: string;
  public year!: string;
  public unsort!: string;

  @Output() sortEvent = new EventEmitter();

  takenSortEvent(event: any) {
    this.sortEvent.emit(event.target.value);
  }
}
