import { LightningElement, track } from 'lwc';
import searchBooks from '@salesforce/apex/LibraryBook.getBooks';
import borrowBooks from '@salesforce/apex/LibraryBook.borrowBooks';
import Id from '@salesforce/user/Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SearchBooks extends LightningElement {
    @track listOfBooks;
    searchValue;
    searchType = 'Name';    
    selectedBooks;
    error;

   columns = [
        { label: 'Id', fieldName: 'Id' },
        { label: 'Name', fieldName: 'Name', type: 'text'},
        { label: 'Status', fieldName: 'Status__c', type: 'picklist'}
    ];

    handleSearchBook(){
        console.log('Search Type ' + this.searchType);
        console.log('Search Value ' + this.searchValue);
        //Call Apex method imperatively
        searchBooks({ searchType: this.searchType, searchValue: this.searchValue })
            .then((result) => {
                console.log(result);
                this.listOfBooks = result;
                this.error = undefined;
            })
            .catch((error) => {
                this.error = error;
                this.listOfBooks = undefined;
            });
    }

    //on change in the search text, capturing the latest search value
     searchKeyword(event){
        this.searchValue = event.target.value;
    } // end of searchKey onChange

    //Radio Button Display options
    get options() {
        return [
            { label: 'Id', value: 'Id' },
            { label: 'Name', value: 'Name' },
            { label: 'Author', value: 'Author__c' },
            { label: 'Category', value: 'Category__c' }
        ];
    }

    handleRadioChange(event) {
        this.searchType = event.detail.value;
    }
    //On click of Borrow Button function to act
    handleBorrowBook(){
        console.log('current user extracted is ' + Id);
        borrowBooks({ books: this.selectedBooks, currentUser: Id})
            .then((result) => {
                this.error = undefined;
                const evt = new ShowToastEvent({
                    title: result,
                    message: 'Book Borrowed Successfully',
                    variant: 'Success',
                });
                this.dispatchEvent(evt);
                //calling handle search book to refresh the grid.
                this.handleSearchBook();
            })
            .catch((error) => {
                //dispatch error toaster
                this.error = error;
                
            });
    }
    //On selection of a book from the data table to the data
    getSelectedName(event) {
        this.selectedBooks = event.detail.selectedRows;
        // Display that fieldName of the selected rows
        //for (let i = 0; i < selectedRows.length; i++){
          //  alert("You selected: " + selectedRows[i].Name);
        //}
    }
    
} // end of class
