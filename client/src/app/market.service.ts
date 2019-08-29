import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from './models/user.model';
import { Person } from './models/person.model';
import { LoginUser } from './models/login.model';
import { Item } from './models/item.model';
import { IncItem } from './models/inc-item.model';
import { Order } from './models/order.model';
import { IDsToCategory } from './models/ids-adding-to-categ.model';

@Injectable()

export class MarketService {
    constructor(private http: HttpClient) {}
    

    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        responseType: 'text' as 'json'
    }


    registerFirstStep(user: User): Observable<User> {
        return  this.http.post<User>(`/register/step1`,user, this.httpOptions);
    }

    registerSecondStep(person: Person): Observable<Person> {
        return  this.http.patch<Person>(`/register/step2`,person, this.httpOptions);
    }



    validateId(id:number): Observable<any> {
        return this.http.get(`/users/${id}`);
    }

    //  ====== Grocery =======

    getProducts(): Observable<any> {
        return this.http.get(`/storehouse/products`);
    }


    getOneProduct(productName: string): Observable<any> {
        return this.http.get(`/storehouse/products/${productName}`);
    }

    countProducts(): Observable<any> {
        return this.http.get(`/storehouse/numofproducts`);
    }


    countOrders(): Observable<any> {
        return this.http.get(`/orders/numoforders`);
    }

    // ======login & logout=========

    loginToSystem(user: LoginUser): Observable<LoginUser> {
        return  this.http.post<LoginUser>(`/login`,user, this.httpOptions);
    }

    logoutFromSystem(): Observable<any> {
        return this.http.get(`/users/logout`);
    }

    // ======check if cart is active======
    isCartActive(): Observable<any> {
        return this.http.get(`/dashboard/cart`);
    }

    // ======create new cart=============
    createNewCart(): Observable<any> {
        return  this.http.post<any>(`/dashboard/newcart`, this.httpOptions);
    }

    disactivateCart():Observable<any> {
        return  this.http.patch<any>(`/dashboard/checkout`, this.httpOptions);
    }



    // ======if acrt is active, get all products from cart=====

    getProductsFromCart(): Observable<any> {
        return this.http.get(`/dashboard`);
    }

    // ======get all Categories======

    getCategories(): Observable<any> {
        return this.http.get(`/storehouse/categories`);
    }

    getSpecificCategory(id:number): Observable<any> {
        return this.http.get(`/storehouse/categories/${id}`);
    }

    // ======delete Product from cart=====

    removeItemFromCart(id:number): Observable<any> {
        return this.http.delete(`/dashboard/removeitem/${id}`);
    }
    removeAllItemsFromCart(): Observable<any> {
        return this.http.delete(`/dashboard/removeallitems`);
    }

    // ======add product to cart========

    addProductToCart(item: Item): Observable<Item> {
        return  this.http.put<Item>(`/dashboard/additem`,item, this.httpOptions);
    }
    // ======increment quantity of product in cart========

    incProductsInCart(item: IncItem): Observable<IncItem> {
        return  this.http.patch<IncItem>(`/dashboard/incqtyitem`,item, this.httpOptions);
    }

    // ======get last purchase, cart with status complete 

    getLastPurchase(): Observable<any> {
        return this.http.get(`/orders/lastorder`);
    }

    getShippingDates(): Observable<any> {
        return this.http.get(`/orders/shippingdate`);
    }

    purchaseProducts(order: Order): Observable<Order> {
        return  this.http.put<Order>(`/orders`,order, this.httpOptions);
    }
   
    // ======add new product to groccery====

    addProductToGroccery(fd): Observable<any> {
        return  this.http.post(`/admin/addproduct`,fd);
    }


    editProductInGroccery(fd): Observable<any> {
        return  this.http.patch(`/admin/editproduct`,fd);
    }
    
    // =======addproduct to category ======

    recordToCategory(IDs: IDsToCategory): Observable<IDsToCategory> {
        return this.http.patch<IDsToCategory>(`/admin/prodtocategory`, IDs, this.httpOptions)
    }

    // ======name of admin ======

    adminName(): Observable<any> {
        return this.http.get(`/admin`);
    }
   
}