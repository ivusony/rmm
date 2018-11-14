(function(){



	var copy_btn = $('.copy'),
		onkey = $('#onkey'),
		offkey = $('#offkey'),
		reload = $('#reload'),
		reload_button = $('#reload_button'),
		timer = null;
		const rwc_field = $('#rwc'),
			  modemIP_field = $('#modemIP'),
			  cpe_field = $('#cpe');

			  rwc_field.on('input', function(){
			  	rwc_field.val(rwc_field.val().trim());
			  	modemIP_field.focus();
			  });
			  modemIP_field.on('change', function(){
			  	modemIP_field.val(modemIP_field.val().trim());
			  });
			  cpe_field.on('input', function(){
			  	cpe_field.val(cpe_field.val().trim());
			  	rwc_field.focus();
			  });
 	$('.generateKey').on("click", function(){
 		var rwc = $('#rwc').val(),
 		    modemIP = $('#modemIP').val(),
 		    cpe = $('#cpe').val(),

 		    //KEYS
 		    ciscoAquilaOnKey = 'snmpset -v2c -c ' + rwc + ' ' + modemIP + ' 1.3.6.1.4.1.1429.77.1.7.2.1.3.1.40 i 100 \n',
 		    ciscoAquilaOffKey = 'snmpset -v2c -c ' + rwc + ' ' + modemIP + ' 1.3.6.1.4.1.1429.77.1.7.2.1.3.1.40 i 0 \n',

 		    ciscoCmdOnKey = 'SnmpSet.exe -r:' + modemIP + ' -v:2c -c:"' + rwc + '" -o:1.3.6.1.4.1.1429.77.1.7.2.1.3.1.40 -val:100 -tp:int \n',
 		    ciscoCmdOffKey = 'SnmpSet.exe -r:' + modemIP + ' -v:2c -c:"' + rwc + '" -o:1.3.6.1.4.1.1429.77.1.7.2.1.3.1.40 -val:0 -tp:int \n',

 		    thomsonAquilaOnKey = 'snmpset -v2c -c ' + rwc + ' ' + modemIP + ' 1.3.6.1.4.1.2863.205.10.1.6.0 i 1 \nsnmpset -v2c -c ' + rwc + ' ' + modemIP + ' 1.3.6.1.4.1.2863.205.1.1.78.2.0 i 2 \n',
 		    thomsonAquilaOffKey = 'snmpset -v2c -c ' + rwc + ' ' + modemIP + ' 1.3.6.1.4.1.2863.205.10.1.6.0 i 2 \nsnmpset -v2c -c ' + rwc + ' ' + modemIP + ' 1.3.6.1.4.1.2863.205.1.1.78.2.0 i 0 \n',

 		    thomsonCmdOnKey = 'SnmpSet.exe -r:' + modemIP + ' -v:2c -c:"' + rwc + '" -o:1.3.6.1.4.1.2863.205.10.1.6.0 -val:1 -tp:int \nSnmpSet.exe -r:' + modemIP + ' -v:2c -c:"' + rwc + '" -o:1.3.6.1.4.1.2863.205.1.1.78.2.0 -val:2 -tp:int\n',
 		    thomsonCmdOffKey = 'SnmpSet.exe -r:' + modemIP + ' -v:2c -c:"' + rwc + '" -o:1.3.6.1.4.1.2863.205.10.1.6.0 -val:2 -tp:int \nSnmpSet.exe -r:' + modemIP + ' -v:2c -c:"' + rwc + '" -o:1.3.6.1.4.1.2863.205.1.1.78.2.0 -val:0 -tp:int\n';
 		    //END OF KEY GENERATIONS

 		var radio = $('input[type=radio]');
 		var ciscoRadio = $('#cisco');
 		var thomsonRadio = $('#thomson');
 		var configONKey = $('#onKey');
 		var configOFFKey = $('#off');
 		var page = $('#page');
 		var hidden = $('#hide');
 		var selection = $('.selection');

 		if (rwc.length===0 || modemIP.length===0 || cpe.length===0) { 
 			alert("All fields are required!");
 		}else{
 			if(!radio.is(':checked')){
 				alert("Please select modem type!");
 				return;
 			}else{
 				if ($(this).is("#genAquila")) {      //if aquila option button pressed
 					if (ciscoRadio.is(':checked')) {   //is cisco
		 				configONKey.text(ciscoAquilaOnKey);
		 				configOFFKey.text(ciscoAquilaOffKey);
		 				page.attr('href', 'http://'+cpe+':8080');
		 				page.text('http://'+cpe+':8080');
		 				hidden.fadeIn();
		 			}else if(thomsonRadio.is(':checked')){  //if thomson
		 				configONKey.text(thomsonAquilaOnKey);
		 				configOFFKey.text(thomsonAquilaOffKey);
		 				page.attr('href', 'http://'+cpe+':8080');
		 				page.text('http://'+cpe+':8080');
		 				hidden.fadeIn();
		 			}
		 			$(this).text("ON key for Aquila copied to clipboard!");
 				}else{                               //if cmd option button pressed
 					if (ciscoRadio.is(':checked')) {   //if cisco
		 				configONKey.text(ciscoCmdOnKey);
		 				configOFFKey.text(ciscoCmdOffKey);
		 				page.attr('href', 'http://'+cpe+':8080');
		 				page.text('http://'+cpe+':8080');
		 				hidden.fadeIn();
		 			}else if(thomsonRadio.is(':checked')){  //if thomson
		 				configONKey.text(thomsonCmdOnKey);
		 				configOFFKey.text(thomsonCmdOffKey);
		 				page.attr('href', 'http://'+cpe+':8080');
		 				page.text('http://'+cpe+':8080');
		 				hidden.fadeIn();
		 			}
		 			$(this).text("ON key for CMD copied to clipboard!");
 				}
	 		
	 			
	 			autoCopyOnKey();
 			}//end of else
 		}//ende of else
 	});
 	function autoCopyOnKey(){
 			$(this).text("Copied to clipboard!");
	 		$(this).attr('disabled','disabled');
	 		offkey.addClass('danger'); //danger class
	 		offkey.text("TURN REMOTE MODEM MANAGEMENT OFF!");
 	}
 	offkey.on('click', function(){
 		$(this).text("RMM 'off' key copied to clipboard!");
 		$(this).removeClass('danger'); //danger class
 		onkey.off();
 		reload.fadeIn();
 	});
 	//LOGO RELOAD
 	$('#logo').on('click', function(){
 		location.reload()
 	});
 	reload_button.on('click', function(){
 		$('#rwc').val('');
 		$('#modemIP').val('');
 		$('#cpe').val('');
 		$('#hide').hide();
 		$('#genAquila').text("Copy RMM 'ON' key for Aquila server");
 		$('#genCmd').text("Copy RMM 'ON' key for Windows CMD");
 	});


})();