{
    let mip     = $('#modemIP'),
        wc      = $('#wCOM'),
        cpeip   = $('#cpeIP'),
        
        aquilaKey  = $('#aquilaKey');



        aquilaKey.on('click', function(){
            mtype   = $( ".dropdown option:selected").val();
            console.log(mip.val());
            console.log(wc.val());
            console.log(cpeip.val());
            console.log(mtype);
        })


    
        
}