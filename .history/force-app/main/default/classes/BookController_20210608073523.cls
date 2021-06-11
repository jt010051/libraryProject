public with sharing class BookController {
    @AuraEnabled(cacheable=true)
    public static List<Book__c> getBooks() {
        return [
            SELECT NAME,  Overdue_Fees__c, Due_Date__c
            FROM Book__c
            Where In_Stock__c = true
            WITH SECURITY_ENFORCED
       ];
    }
}
