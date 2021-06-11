<template>
    <lightning-card>
        <template if:true={books.data}>
            <lightning-datatable
                key-field="Id"
                data={books.data}
                columns={columns}
            >
       
           </lightning-datatable>
        
           
         </template>
    </lightning-card>
 
</template>