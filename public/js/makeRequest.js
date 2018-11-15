{
    //the object constructor
    class Request{
        constructor(modemip,writecom,cpeip,modemType,requestType){
            this.modemip = modemip,
            this.wc = writecom,
            this.cpeip = cpeip,
            this.modemType = modemType,
            this.requestType = requestType
        }
    }
    //returns input field array from whatever the user passes
    Request.prototype.toArray = function(){
        return {modemIP:this.modemip, wc:this.wc, cpeIP:this.cpeip, modemType:this.modemType, requestType:this.requestType}
    }
    //takes in the three input field array and sanitizes the valuesso that no script tag should be passed to
    //the server. If one is detected, method returns an empty string element in array
    Request.prototype.sanitize = function(obj){
        // return newArr = arr.map((el)=>{
        //     var output = el.replace(/<script[^>]*?>.*?<\/script>/gi, '').
		// 			 replace(/<[\/\!]*?[^<>]*?>/gi, '').
		// 			 replace(/<style[^>]*?>.*?<\/style>/gi, '').
		// 			 replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
	    //     return output;
        // });
        // $.each(obj, function(key, value){
        //      return obj.key = 
        // })
        // return obj

        //HERE CONTINUE
    }

    
    
    
    const  request_btn  = $('.request_btn');
    request_btn.on('click', function(){
        let newRequest = new Request($('#modemIP').val().trim(), $('#wCOM').val().trim(), $('#cpeIP').val().trim(), $('#modemType option:selected').val(), $(this).attr('id'));
        let request = newRequest.sanitize(newRequest.toArray());
        
        console.log(request)
    })




    
        
}