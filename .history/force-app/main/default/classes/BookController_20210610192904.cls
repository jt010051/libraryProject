public with sharing class BookController {
    @AuraEnabled(cacheable=true)
    public static List<Book__c> getBooks() {
        return [
            SELECT NAME
            FROM Book__c
            WITH SECURITY_ENFORCED
       ];
    }
    @AuraEnabled(cacheable=true)
public static List<Book__c> getUserBorrowedBooks(Id currentUser){
try{
System.debug('Current User received from Wire Apex is ' + currentUser);
List<Book__c> listOfBorrowedBooks = [
    SELECT Id, NAME
    FROM Book__c
WITH SECURITY_ENFORCED
];
System.debug('List of Borrowed Books ' + listOfBorrowedBooks);
return listOfBorrowedBooks;
}
catch(Exception e){
throw e;
}
}
@AuraEnabled(cacheable=true)

public static List<Book__c> allBooks() {
    return [
        SELECT ID, NAME
        FROM Book__c
        WITH SECURITY_ENFORCED
   ];
}
}
