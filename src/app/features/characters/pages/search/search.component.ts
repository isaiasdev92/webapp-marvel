import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.componente.css']
})
export class SearchComponent {
  terms: string = '';
  @Output() searchEvent = new EventEmitter<string>();


  searchElements() {
    console.log(`ESTA EMITIENDO ${this.terms}`);
    this.searchEvent.emit(this.terms);
  }
}
