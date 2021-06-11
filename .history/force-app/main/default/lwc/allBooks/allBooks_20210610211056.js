import { LightningElement, wire , track} from 'lwc';
import Name from '@salesforce/schema/Book__c.Name';
import Book_Id from '@salesforce/schema/Book__c.ID';
import Author from '@salesforce/schema/Book__c.Author__c';
import Category from '@salesforce/schema/Book__c.Category__c';
import Status from '@salesforce/schema/Book__c.Status__c';
import User_id from '@salesforce/schema/Book__c.Status__c';

import Id from '@salesforce/user/Id';

import allBooks from '@salesforce/apex/BookController.allBooks';

const COLUMNS = [
    { label: 'User Id', fieldName: Id.fieldApiName, type: 'Id' },
    { label: 'Book ID', fieldName: Book_Id.fieldApiName, type: 'Id' },
    { label: 'Book Name', fieldName: Name.fieldApiName, type: 'text' },
    { label: 'Author', fieldName: Author.fieldApiName, type: 'text' },
    { label: 'Category', fieldName: Category.fieldApiName, type: 'text' },
    { label: 'Status', fieldName: Status.fieldApiName, type: 'text' },

];
export default class BookList extends LightningElement {
    columns = COLUMNS;
    @wire(allBooks) books;
    currentUser = Id;
    selectedBooks;
    error;



    
}
