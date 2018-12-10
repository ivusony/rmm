const fomrs = {
    modem: '<div class="ten wide tablet five wide computer column"> <div class="ui mini form"> <form action="" method="POST"> <div class="field"> <label>CM MAC</label> <input name="modem_mac" type="text"></div><div class="field"> <label>SERIAL</label> <input name="modem_serial" type="text"> </div><div class="field"> <label>MTA MAC</label> <input name="modem_mta" type="text"> </div><div class="field"> <textarea name="modem_textarea" id="" cols="30" rows="10" placeholder="Modems added will appear here automatically"></textarea> </div></form> </div><button class="ui fluid red button">Copy modems</button></div>',
    stb: '<div class="ten wide tablet five wide computer column"> <div class="ui mini form"> <form action="" method="POST"> <div class="field"> <label>SERIAL/VERIFIER</label> <input name="stb_serial" type="text"> </div><div class="field"> <label>CASN/CAID</label> <input name="stb_casn" type="text"> </div><div class="field"> <textarea name="stb_serials" id="" cols="30" rows="10" placeholder="Stbs added will appear here automatically"></textarea> </div></form> </div><button class="ui fluid red button">Copy stb</button></div>'
}

module.exports = {
    renderPage:function(req, res, next){
        res.render('devicescanner', {
            currentUser: req.user
        })
    },
    renderForm : function(req, res, next){
        res.set('Content-Type', 'text/html');
        
            req.params.device==='modem' ?   res.send(fomrs.modem) 
        :   req.params.device==='stb'   ?   res.send(fomrs.stb)
        :   undefined
        
    }
}