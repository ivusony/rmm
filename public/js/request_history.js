;(function(global, $){
    function Credentials(cpe,wc,mip){
        this.cpe = cpe;
        this.wc = wc;
        this.mip = mip;
    }
    Credentials.prototype.sendRequest = function(){
        $.ajax({
            url: '/copyoff',
            method: 'POST',
            data: {
                cpe: this.cpe,
                wc: this.wc,
                mip: this.mip,
                requestType: 'aquilaOffKey'
            }
        })
    }
    $('.still_on').on('click', function(){
        var cpe = $(this).find('td.cpeip').html(),
            wc  = $(this).find('td.wc').html()
            mip = $(this).find('td.modemip').html();

        var newRequest = new Credentials(cpe, wc, mip);
        
        newRequest.sendRequest();
    })
})(window, jQuery)
    
   
