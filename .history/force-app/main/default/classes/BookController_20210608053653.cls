public with sharing class BookController {
    @AuraEnabled(cacheable=true)
    public static List<Book__c> getBooks(Id bookId) {
        return [
            SELECT NAME,  Overdue_Fees__c, Due_Date__c
            FROM Book__c
            WHERE OwnerId = :bookId
            WITH SECURITY_ENFORCED
       ];
    }
}
