import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
  header {
  background-color: #FF0000;
  height: 100px;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  color: #FFFFFF;
}

.text-header {
  font-size: 36px;
  margin: 0;
  line-height: 1.2;
}
  `
  ]
})
export class HeaderComponent {

}
