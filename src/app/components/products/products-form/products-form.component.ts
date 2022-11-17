import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from '../../../services/product.service';
import { Provider } from '../../../interfaces/provider.interface';
import { ProvidersService } from '../../../services/providers.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css'],
})
export class ProductsFormComponent implements OnInit {
  product: Product = {
    name: '',
    description: '',
    presentation: '',
    expiration: new Date(),
    providerPrice: 0,
    unitPrice: 0,
    existence: 0,
    date: new Date(),
    brand: '',
    provider: 0
  };

  productFormControl = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    presentation: new FormControl('', [Validators.required]),
    expiration: new FormControl<Date | undefined>(undefined, [Validators.required]),
    providerPrice: new FormControl<number | undefined>(undefined, [Validators.required]),
    unitPrice: new FormControl<number | undefined>(undefined, [Validators.required]),
    existence: new FormControl<number | undefined>(undefined, [Validators.required]),
    date: new FormControl<Date | undefined>(undefined, [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    provider: new FormControl<number | Provider>(0, [Validators.required]),
  })
  providers: Provider[] = [];
  newProduct: boolean = false;

  constructor(
    private productService: ProductService,
    private providerService: ProvidersService,
    public dialogRef: MatDialogRef<ProductsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) { }

  ngOnInit(): void {

    if (this.id == null) {
      this.newProduct = true;
    }
    else {
      this.getProduct(this.id);

    }
    this.getProviders();
  }

  async getProduct(id: number) {
    this.product = await this.productService.getProduct(id);
    this.productFormControl.setValue({
      brand: this.product.brand,
      date: this.product.date,
      description: this.product.description,
      existence: this.product.existence,
      expiration: this.product.expiration,
      name: this.product.name,
      presentation: this.product.presentation,
      provider: this.product.provider,
      providerPrice: this.product.providerPrice,
      unitPrice: this.product.unitPrice
    });
  }

  async getProviders() {
    this.providers = await this.providerService.getProviders();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitProduct() {
    if (this.productFormControl.valid) {
      const value = this.productFormControl.value;
      this.productService.createProduct({
        brand: value.brand!,
        date: value.date!,
        description: value.description!,
        existence: value.existence!,
        expiration: value.expiration!,
        name: value.name!,
        presentation: value.presentation!,
        provider: value.provider!,
        providerPrice: value.providerPrice!,
        unitPrice: value.unitPrice!
      }).subscribe((res) => {
        if (res) {
          this.dialogRef.close();
          alert('Producto creado!');
        }
      });
    }
  }

  updateProduct() {
    const provider = this.product.provider as Provider;

    this.productService
      .updateProduct(this.id, {
        brand: this.productFormControl.controls.brand.value!,
        date: this.productFormControl.controls.date.value!,
        description: this.productFormControl.controls.description.value!,
        existence: this.productFormControl.controls.existence.value!,
        expiration: this.productFormControl.controls.expiration.value!,
        name: this.productFormControl.controls.name.value!,
        presentation: this.productFormControl.controls.presentation.value!,
        provider: provider.id,
        providerPrice: this.productFormControl.controls.providerPrice.value!,
        unitPrice: this.productFormControl.controls.unitPrice.value!
      })
      .subscribe((res) => {
        if (res) {
          this.dialogRef.close();
          alert('Producto actualizado!');
        }
      });
  }
}
