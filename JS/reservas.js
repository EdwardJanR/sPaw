flatpickr("#fecha", {
    locale: "es",          
    minDate: "today",      
     maxDate: new Date().fp_incr(90),
    dateFormat: "d-m-Y",  
    altInput: true,       
    altFormat: "F j, Y",  
    allowInput: true
});
