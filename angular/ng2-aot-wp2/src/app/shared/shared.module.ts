import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
// import { AwesomePipe }         from './awesome.pipe';
// import { AwesomeDirective }  from './awesome.directive';

@NgModule({
  imports: [ CommonModule ],
  exports: [ CommonModule, FormsModule ]           
})
export class SharedModule { }
