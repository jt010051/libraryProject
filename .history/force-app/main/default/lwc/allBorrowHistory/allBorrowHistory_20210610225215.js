import { LightningElement, wire , track} from 'lwc';
import Name from '@salesforce/schema/Borrow_Book_Info__c.Book__r.Name';
import Book_Id from '@salesforce/schema/Borrow_Book_Info__c.Book__r.ID';
import Author from '@salesforce/schema/Borrow_Book_Info__c.Book__r.Author__c';
import Category from '@salesforce/schema/Borrow_Book_Info__c.Book__r.Category__c';
import Status from '@salesforce/schema/Borrow_Book_Info__c.Book__r.Status__c';
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
    @wire(listOfallBorrowedBooks) books;
    currentUser = Id;
    selectedBooks;
    error;



    
}
