const fomrs = {
    modem: '<div class="ten wide tablet five wide computer column"><div class="ui mini form"><form action="" method="POST"><div class="field"> <label>CM MAC</label> <input name="modem_mac" type="text"></div><div class="field"> <label>SERIAL</label> <input name="modem_serial" type="text"></div><div class="field"> <label>MTA MAC</label> <input name="modem_mta" type="text"></div><div class="field"><textarea name="modem_textarea" id="modem_textarea" cols="30" rows="10" placeholder="Modems added will appear here automatically"></textarea></div></form></div> <button class="ui fluid red button copy" id="copy_modems" data-clipboard-target="#modem_textarea">Copy modems</button></div>',
    stb: '<div class="ten wide tablet twelwe wide computer column"><div class="ui mini form"><div class="field"> <label>SERIAL/VERIFIER</label> <input name="stb_serial" type="text"></div><div class="field"><textarea name="stb_serials" id="stb_serials" cols="30" rows="10" placeholder="STBs added will appear here automatically"></textarea></div> <button class="ui fluid red button copy" id="copy_stb" data-clipboard-target="#stb_serials">Copy stb</button></div></div><div class="ten wide tablet twelwe wide computer column"><div class="ui mini form"><div class="field"> <label>CDSN/CAID</label> <input name="stb_casn" type="text"></div><div class="field"><textarea name="cdsn_serials" id="cdsn_serials" cols="30" rows="10" placeholder="CDSNs added will appear here automatically"></textarea></div> <button class="ui fluid red button copy" id="copy_cdsn" data-clipboard-target="#cdsn_serials">Copy cdsn</button></div></div>'
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