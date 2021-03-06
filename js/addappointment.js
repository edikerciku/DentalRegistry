$(document).ready(function(){
	$('#date').datepicker();
	var $message = $('#message');
	$message.dialog({autoOpen:false,closeOnEscape:false,modal:true,resizable:false,width:600});
	
	$('#search').button().click(function(){
		var $formdata = $('form').serialize();
		$.post('modules/showdentistday.php',$formdata,function(data){
			$message.html(data);
			$message.dialog({
				title:'<img alt="success" src="images/success.png" /> Horario por dia',
				buttons:{'Aceptar':function(){$(this).dialog('close');}}
			});
			$message.dialog('open');
		});
	});
	
	$('#add').button().click(function(){
		$('#loader').show();
		$('#add').hide();
		var $formdata = $('form').serialize();
		$.post('modules/checkappointmentdata.php',$formdata,function(value){
			if(value == '1'){
				$.post('modules/addappointment.php',$formdata,function(data){
					if(data == '1'){
						$message.html('Cita agendada satisfactoriamente');
						$message.dialog({
							title:'<img alt="success" src="images/success.png" /> Registro satisfactorio',
							buttons:{
								'Volver al Paciente':function(){window.location = 'patient.php?id=' + $('#patient').val();},
								'Menu Principal':function(){window.location = 'menu.php';}
							}
						});
					}
					else{
						$message.html(data);
						$message.dialog({
							title:'<img alt="warning" src="images/warning.png" /> Error en el registro',
							buttons:{'Aceptar':function(){$(this).dialog('close');}}
						});
					}
					$message.dialog('open');
				});
			}
			else{
				$message.html(value);
				$message.dialog({
					title:'<img alt="warning" src="images/warning.png" /> Error en los datos ingresados',
					buttons:{'Aceptar':function(){$(this).dialog('close');}}
				});
				$message.dialog('open');
			}
			$('#loader').hide();
			$('#add').show();
		});
	});
});