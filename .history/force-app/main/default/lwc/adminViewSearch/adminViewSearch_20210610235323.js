import { LightningElement, track } from 'lwc';
import searchUsers from '@salesforce/apex/BookController.getBooks';
import Book from '@salesforce/schema/Book__c.Name';
import Name from '@salesforce/schema/User.Name';

import Id from '@salesforce/user/Id';

export default class AdminViewSearch extends LightningElement {
    @track listOfUsers;

    searchValue;
    searchType = 'Name';  
    selectedUsers;
    error;
    columns = [
        { label: 'Id', fieldName: Id , type:'Id'},
        { label: 'Name', fieldName: Name, type: 'text'},
        { label: 'Book Name', fieldName: Book, type: 'text'},

    ];


    handleSearchUser(){
        console.log('Search Type ' + this.searchType);
        console.log('Search Value ' + this.searchValue);
        //Call Apex method imperatively
        searchUsers({ searchType: this.searchType, searchValue: this.searchValue })
            .then((result) => {
                console.log(result);
                this.listOfUsers = result;
                this.error = undefined;
            })
            .catch((error) => {
                this.error = error;
                this.listOfUsers = undefined;
            });
    }

    searchKeyword(event){
        this.searchValue = event.target.value;
    }

    getSelectedName(event) {
        this.selectedUsers = event.detail.selectedRows;
        // Display that fieldName of the selected rows
        //for (let i = 0; i < selectedRows.length; i++){
          //  alert("You selected: " + selectedRows[i].Name);
        //}
    }
}