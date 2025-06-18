import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-from',
  imports: [ReactiveFormsModule],
  templateUrl: './new-from.html',
  styleUrl: './new-from.css'
})
export class ProductNewFrom {
  formData!: FormGroup;

  constructor(){
    this.formData= new FormGroup({
      name: new FormControl( '', [Validators.required, Validators.min(5), Validators.max(50)]),
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
  
  ngOnInit(){console.log('ngOnInit');
  }

  ngOnChanges(){console.log('ngOnChanges');
  }

  ngDoCheck(){console.log('ngDoCheck');
  }

  ngAfterContentInit(){console.log('ngAfterContentInit');
  }

  ngAfterContentChecked(){console.log('ngAfterContentChecked');
  }

  ngAfterViewInit(){console.log('ngAfterViewInit');
  }

  ngAfterViewChecked(){console.log('ngAfterViewChecked');
  }

  afterEveryRender(){console.log('afterEveryRender')}
  
  ngOnDestroy(){console.log('ngOnDestroy');
  }

}
