import { afterEveryRender, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category-service';


@Component({
  selector: 'app-new-form',
  imports: [],
  templateUrl: './new-form.html',
  styleUrl: './new-form.css'
})
export class NewForm {
  formData!: FormGroup;

  constructor( private categoryService: CategoryService) {
    this.formData= new FormGroup({
      name: new FormControl( '', [Validators.required]),
      description: new FormControl('',[]),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      stock: new FormControl(1, [Validators.min(1)]),
      urlImage: new FormControl(),
      category: new FormControl(),
      state: new FormControl(true, [Validators.required]),
    });
  };

  onSubmit(){
    if(this.formData.valid){
      console.log(this.formData.value)

    }this.formData.reset();
  }

// ngOnChanges() {
//   console.log('ngONChanges')
// }
ngOnInit() {
  this.categoryService.getCategories()
}
// ngDoCheck(){
//   console.log('ngDoCheck')
// }
// ngAfterContentInit() {
//   console.log('ngAfterContentInit')
// }
// ngAfterContentChecked() {
//   console.log('ngAfterContentChecked')
// }
// ngAfterViewInit() {
//   console.log('ngAfterViewInit')
// }
// ngAfterViewChecked() {
//   console.log('ngAfterViewChecked')
// }
// afterEveryRender(){
//   console.log('afterEveryRender')
// }
ngOnDestroy() {
  console.log('ngOnDestroy')
}



}

