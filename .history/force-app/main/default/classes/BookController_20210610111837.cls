public with sharing class BookController {
    @AuraEnabled(cacheable=true)
    public static List<Book__c> getBooks() {
        return [
            SELECT NAME,  Overdue_Fees__c, Due_Date__c
            FROM Book__c
            Where In_Stock__c = false
            WITH SECURITY_ENFORCED
       ];
    }
    @AuraEnabled
public static List<Borrow_Book_Info__c> getUserBorrowedBooks(Id currentUser){
try{
System.debug('Current User received from Wire Apex is ' + currentUser);
List<Borrow_Book_Info__c> listOfBorrowedBooks = [SELECT Id,Book__r.Id,Book__r.Name,Book__r.Availability_Status__c, User__c, Issue_Date__c, Return_Date__c FROM Borrow_Book_Info__c WHERE Book__r.In_Stock__c = true AND User__c = :currentUser];
System.debug('List of Borrowed Books ' + listOfBorrowedBooks);
return listOfBorrowedBooks;
}
catch(Exception e){
throw e;
}
}
public static List<Book__c> allBooks() {
    return [
        SELECT ID, NAME, Availability_Status__c, Overdue_Fees__c, Due_Date__c
        FROM Book__c
        WITH SECURITY_ENFORCED
   ];
}
}
