import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from '../../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductsFormComponent } from '../products-form/products-form.component';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  
  admin: boolean = false;
  user: User = {
    role: 'all',
    user: null,
  };
  
  products: Product[] = [];
  displayedColumns = [
    'name',
    'brand',
    'unitPrice',
    'existence',
    'edit',
    'delete',
  ];

  product: Product = {
    name: '',
    description: '',
    presentation: '',
    expiration: new Date(),
    providerPrice: 0,
    unitPrice: 0,
    existence: 0,
    date: new Date(),
    brand: ''
  };

  quantity = new FormControl<number>(0,[Validators.required, Validators.min(1)]);

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.getProducts();
    const res = await this.authService.logged();
    if (res) {this.user = res; this.admin =true};
    console.log(this.user);
    console.log(this.admin);
  }

  async getProducts() {
    this.products = await this.productService.getProducts();
  }

  async getProduct(id: number) {
    this.product = await this.productService.getProduct(id);
  }

  openDialognew(): void {
    const dialogRef = this.dialog.open(ProductsFormComponent, {
      width: '400px',
      data: undefined,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getProducts();
    });
  }

  openDialog(id: number): void {

    const dialogRef = this.dialog.open(ProductsFormComponent, {
      width: '400px',
      data: id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getProducts();
    });
  }

  deleteProduct(id: number) {
    //console.log(id)
    this.productService.deleteProduct(id).subscribe((res) => {
      alert('Producto eliminado!');
      this.getProducts();
    });
  }

  async buyProduct(id: number) {
    if (!this.quantity.valid) {
      alert('Ingrese una cantidad valida!')
      return
    }

    this.product = await this.productService.getProduct(id);
    if (this.product.existence < this.quantity.getRawValue()!) {
      alert('Inventario insuficiente')
      this.quantity.setValue(0);
      return
    }
    alert(this.quantity.getRawValue()+' '+this.product.name+' comprado')
    this.quantity.setValue(0);
   
  }
}
