public with sharing class BookController {
    @AuraEnabled(cacheable=true)
    public static List<Book__c> getBooks(Id bookId) {
        return [
            SELECT NAME,  Overdue_Fees__c, Availability_Status__c
            FROM Book__c
            WHERE BookId = :bookId
            WITH SECURITY_ENFORCED
       ];
    }
}
