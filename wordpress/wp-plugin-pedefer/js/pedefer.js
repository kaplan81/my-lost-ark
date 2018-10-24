jQuery(document).ready(function ($) {
	// REGISTRATION FORM VALIDATION WITH A LIMIT OF 200 PEOPLE PER EVENT
	$('.reg-rooms-block option').each(function() {
		if($(this).data('people') > 200) {
			$(this).attr('disabled', 'disabled').append('&nbsp;--&nbsp;&iexcl;Sala completa&excl;');
		}
	});

	function validateEmail(field) {
	  if (field === '') return 'El campo Email es obligatorio.\n';
	    else if (!((field.indexOf('.') > 0) &&
	               (field.indexOf('@') > 0)) ||
	               /[^a-zA-Z0-9.@_-]/.test(field))
	      return 'El campo Email no es correcto.\n';
	  return '';
	}
	function validateWhoAmI(field) {
		if(field.length === 0) return 'Debe usted especificar si es empleado o invitado.\n';
		else return '';
	}
	function validateDataProtection(field) {
		if(field.length === 0) return 'Debe usted aceptar la política de protección de datos.\n';
		else return '';
	}
	function regRoomsBlock1(field) {
		if(field == 0) return 'Debe usted seleccionar una sala para el primer bloque de sesiones.\n';
		else return '';
	}
	function regRoomsBlock2(field) {
		if(field == 0) return 'Debe usted seleccionar una sala para el segundo bloque de sesiones.\n';
		else return '';
	}
	function regRoomsBlock3(field) {
		if(field == 0) return 'Debe usted seleccionar una sala para el tercer bloque de sesiones.\n';
		else return '';
	}
	function regRoomsBlock4(field) {
		if(field == 0) return 'Debe usted seleccionar una sala para el cuarto bloque de sesiones.\n';
		else return '';
	}

	$('#registro-form-submit').click(function(e) {
		var registerForm = $('#registro-form');
		registerForm.submit(function(e) {
			var formURL = $(this).attr('action');
			var postData = $(this).serializeArray();
			$.ajax({
			    type: 'POST',
			    url: formURL,
			    data : postData,
			    success:function(data, textStatus, jqXHR) {
			    	// console.log(textStatus);
			    	// console.log(jqXHR);
			    },
			    error: function(jqXHR, textStatus, errorThrown) {
			    	// console.log(textStatus);
			    	// console.log(errorThrown);
			    }
			});
			postData.unshift({ name: 'action', value: 'pedefer_mail' });
		    $.ajax({
		        type: 'POST',
		        url: pedeferajax.ajaxurl,
		        data : postData,
		        success:function(data, textStatus, jqXHR) {
		        	// console.log(textStatus);
		        	// console.log(jqXHR);
		        	registerForm[0].reset();
		        	swal({ title: "¡Enhorabuena!", text: data, type: 'success', confirmButtonText: 'OK' });
		        },
		        error: function(jqXHR, textStatus, errorThrown) {
		        	// console.log(textStatus);
		        	// console.log(errorThrown);
		        }
		    });
		    e.preventDefault();
		});

		var fail = '';
		if(!$('#reg-first-name')[0].checkValidity()) fail += 'El campo Nombre es obligatorio.\n';
		if(!$('#reg-last-name')[0].checkValidity()) fail += 'El campo Apellidos es obligatorio.\n';
		if(!$('#reg-company')[0].checkValidity()) fail += 'El campo Empresa es obligatorio.\n';
		if(!$('#reg-position')[0].checkValidity()) fail += 'El campo Cargo es obligatorio.\n';
		fail += validateEmail($('#reg-email').val());
		fail += validateWhoAmI($("input[name='regWhoAmI']:checked"));
		fail += validateDataProtection($("input[name='regDataProtection']:checked"));
		fail += regRoomsBlock1($('#reg-rooms-block1').val());
		fail += regRoomsBlock2($('#reg-rooms-block2').val());
		fail += regRoomsBlock3($('#reg-rooms-block3').val());
		fail += regRoomsBlock4($('#reg-rooms-block4').val());

		if (fail === '') {
			registerForm.submit();
			// $('#registro-form-success').text('SU REGISTRO SE HA COMPLETADO CON ÉXITO. EN BREVE RECIBIRÁ UN EMAIL CON LA INFORMACIÓN');
			$(this).off(e);
		} else { 
			swal({ title: "¡Cuidado!", text: fail, type: 'error', confirmButtonText: 'Pruebe otra vez' });
			registerForm.off('submit');
		}
	});
});

