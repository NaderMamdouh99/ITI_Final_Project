import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MealService } from 'src/Services/meal.service';

// declare var $: any;  
// import * as $ from 'jquery';
// import $ from 'jquery';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.css']
})
export class MealFormComponent implements OnInit{
  mealForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('',Validators.required), //[Validators.required,Validators.minLength(3)]),
    details: new FormControl('',Validators.required), //,[Validators.required]),
    price: new FormControl(0,Validators.required), //[Validators.min(100),Validators.max(10000)]),
    discount: new FormControl(0,Validators.required),
    photo: new FormControl(null), //,[requiredFileType('png')]
    categoryId: new FormControl(1),
  });

  //variables
  mealId: number = 0;
  title: string = '';
  btnTitle: string = '';
  message: string = '';
  urlImage: string = '';
  img: File | null = null;
  imgshow: string = '';
  messageValidate = {
    name: {
      required: 'this field required',
    },
  };

  constructor(
    private mealService: MealService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    //initialize variables
    this.title = 'adding new meal';
    this.btnTitle = 'adding';
    this.mealId = 0;
    this.img = null;
    this.urlImage = 'assets/images/meal.jpeg';

    this.mealForm = this.formBuilder.group({
      name: ['', Validators.required],
      details: [''],
      price: [0],
      discount: [0],
      photo: [null],
      categoryId: [1],
    });
    //in case edit
    this.activatedRoute.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      if (id) {
        //TODO:: validate=> photo name do not repeat
        this.mealService.getMeal(id).subscribe((meal) => {
          console.log('hello patch');

          this.mealId = id;
          this.mealForm.patchValue({
            name: meal.name,
            details: meal.details,
            price: meal.price,
            discount: meal.discount,
            categoryId: meal.categoryId,
            photo: meal.photo,
          });

          this.imgshow = meal.photo;
          console.log(meal.photo);
        });
      }
    });
  }
  getData(event: Event) {
    /*** */

    this.mealId = this.activatedRoute.snapshot.params['id'];

    /******* */

    //// do not remove this
    event.preventDefault();
    if (this.mealForm.valid) {
      if (this.mealId > 0) {
        //edit
        this.mealForm.controls['photo'].setValue(this.imgshow);
        this.mealService.edit(this.mealId, this.mealForm?.value).subscribe({
          complete: () => {
            this.router.navigate(['/meals']);
          },
        });
      } else {
        this.mealForm.controls['photo'].setValue(this.imgshow);
        this.mealService.add(this.mealForm.value).subscribe({
          next: (data) => {
            console.log(data);
            // this.mealService.getAll().subscribe();
          },
          complete: () => {
            this.router.navigate(['/meals']);
          },
        });
      }
    }
  }

  //validations
  get nameControl() {
    return this.mealForm.get('name');
    // return this.productForm.controls['name']
  }
  get priceControl() {
    return this.mealForm.get('price');
  }

  get photoControl() {
    return this.mealForm.get('photo');
  }
  get discountControl() {
    return this.mealForm.get('discount');
  }
  get detailsControl() {
    return this.mealForm.get('details');
  }

  HandleFiles(event: any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      this.img = event.target.files[0];
      console.log(event);
      console.log(this.img?.name);
      const reader = new FileReader();
      reader.onload = function (e) {
        // $('#image').attr();
      };
    } else {
      this.img = null;
    }
  }

  /**Mostafa **********/
  image: Uint8Array[] = [];
  convertImageToByteArray(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const byteArray = new Uint8Array(arrayBuffer);
        resolve(byteArray);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }
  /**/

  /*      convert image to from bytes to url               **/
  byteArrayToBlob(byteArray: Uint8Array, contentType: string): Blob {
    return new Blob([byteArray], { type: contentType });
  }

  blobToDataURL(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataURL = reader.result as string;
        resolve(dataURL);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
  /**/

  /*  read image file from device   **/

  async handleImageUpload(event: any) {
    const File = event.target.files[0];
    if (File) {
      const byteArray = await this.convertImageToByteArray(File);

      this.image[0] = byteArray;

      const lob = this.byteArrayToBlob(this.image[0], '');
      this.blobToDataURL(lob).then((_dataURL) => {
        this.imgshow = _dataURL;
      });
    }
  } 
}