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

    @AuraEnabled(cacheable=true)
public static List<Book__c> getUserBorrowedBooks(Id currentUser){

System.debug('Current User received from Wire Apex is ' + currentUser);
return [
    SELECT Id,Name,Availability_Status__c
    FROM Book__c
    WHERE In_Stock__c = false
    WITH SECURITY_ENFORCED
    ];



}
@AuraEnabled(cacheable=true)

public static List<Book__c> allBooks() {
    return [
        SELECT ID, NAME, Availability_Status__c, Overdue_Fees__c, Due_Date__c
        FROM Book__c
        WITH SECURITY_ENFORCED
   ];
}
}
