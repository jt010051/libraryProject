import { LightningElement, wire , track} from 'lwc';
import Name from '@salesforce/schema/Book__c.Name';
import Book_Id from '@salesforce/schema/Book__c.ID';
import Author from '@salesforce/schema/Book__c.Author__c';
import Category from '@salesforce/schema/Book__c.Category__c';
import Status from '@salesforce/schema/Book__c.Status__c';
import User_id from '@salesforce/schema/Book__c.Status__c';

import Id from '@salesforce/user/Id';

import listOfallBorrowedBooks from '@salesforce/apex/BookController.allBorrowedhistory';

const COLUMNS = [
    { label: 'User Id', fieldName: Id.fieldApiName, type: 'Id' },
    { label: 'Book ID', fieldName: Book_Id.fieldApiName, type: 'Id' },
    { label: 'Book Name', fieldName: Name.fieldApiName, type: 'text' },
    { label: 'Author', fieldName: Author.fieldApiName, type: 'text' },
    { label: 'Category', fieldName: Category.fieldApiName, type: 'text' },
    { label: 'Current Status', fieldName: Status.fieldApiName, type: 'text' },

];
export default class BookList extends LightningElement {
    columns = COLUMNS;
    @track listOfallBorrowedBooks;
    currentUser = Id;
    selectedBooks;
    error;
    connectedCallback(){

        this.borrowedBookList();
    }
    borrowedBookList(){
        getBorrowedBooks()
        .then((result)=>{
    console.log(result);
    this.listOfallBorrowedBooks=result;
    let preparedAssets =[];
    this.listOfallBorrowedBooks.forEach(asset=>{
    let preparedAsset={};
    console.log('Borrow Id ' +asset.Id);
    preparedAsset.Id=asset.Id;
    preparedAsset.Book__c=asset.Book__r.Id;
    preparedAsset.Name=asset.Book__r.Name;
    preparedAsset.Status=asset.Book__r.Status__c;
    console.log('Issued Date' +asset.Issued_Date__c);
    preparedAsset.IssuedDate=asset.Issued_Date__c;
    console.log('Returned Date' +asset.Issued_Date__c);
    preparedAsset.ReturnDate=asset.Return_Date__c;
    preparedAsset.IsBorrowActive=asset.IsBorrowActive__c;
    preparedAssets.push(preparedAsset);
    });
    
    this.listOfallBorrowedBooks=preparedAssets;
    this.error =undefined;
    
    
    
        })
    .catch((error)=>{
    this.error =error;
    this.listOfBooks= undefined;
    
    })
    
    }


    
}
