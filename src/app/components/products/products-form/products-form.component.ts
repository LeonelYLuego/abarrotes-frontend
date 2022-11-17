import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css'],
})
export class ProductsFormComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    description: '',
    presentation: '',
    expiration: new Date(),
    providerPrice: 0,
    unitPrice: 0,
    existence: 0,
    date: new Date(),
    brand: '',
    providerId: 0,
  };

  newProduct: boolean = false;

  constructor(
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  ngOnInit(): void {
    this.product = this.data;
    if (this.product.id == undefined) this.newProduct = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitProduct() {
    //console.log(this.product);
    this.productService.createProduct(this.product).subscribe((res) => {
      alert('Producto creado!');
    });
  }

  updateProduct() {
    this.productService
      .updateProduct(this.product.id!, this.product)
      .subscribe((res) => {
        alert('Producto actualizado!');
      });
  }
}
