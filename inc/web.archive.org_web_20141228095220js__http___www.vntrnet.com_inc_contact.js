var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

/* ----------------------------
		Requires jQuery
---------------------------- */

$(document).ready(function(){
  // Handle max words on textareas
  $('textarea[maxwords]').keypress(function(e){
    $(this).parent().removeClass('validation_warning');
    $('p.warning',$(this).parent()).remove();
    words = this.value.split(' ').length;
    if (e.which !== 8) {
      maxWords = $(this).attr('maxwords');
      if (words > maxWords) {
        addWarning(this,"Please limit your input to "+maxWords+" words.");
        return false;
      }
    }
    $('#words').html(words);
  });
  
  $('textarea[maxwords]').keyup(function() {
    $(this).parent().removeClass('validation_warning');
    $('p.warning',$(this).parent()).remove();
    words = this.value.split(' ');
    num_words = words.length;
    maxWords = $(this).attr('maxwords');
    if (num_words > maxWords) {
      addWarning(this,"Please limit your input to "+maxWords+" words.");
      strTruncated = '';
      for (i=0; i<maxWords; i++) {
        strTruncated = strTruncated + words[i] + ' ';
      }
      this.value = strTruncated;
    }
  });
});

function removeWarnings(f) {
  $('p.warning',f).remove();
	$('.validation_warning',f).removeClass('validation_warning');
}

function fnValidate(f) {
	try {
		//Get rid of existing warnings
		removeWarnings(f);
		top.strFirstFailure = '';
		top.bValid = true;
		
		//Loop through all fields
		$(':input',f).each(function(){
			//console.log(this.name);
			validateField(this,f);
		});
		
		if (!top.bValid) eval('f.'+top.strFirstFailure+'.focus()');
		return top.bValid;
	} catch(e) {
		alert(e);
		return false;
	}
}

function validateUserInfo(f) {
	
	//Get rid of existing warnings
	$('p.warning').remove();
	$('.validation_warning').removeClass('validation_warning');
	top.strFirstFailure = '';
	top.bValid = true;
	
	//Loop through all billing address fields
	$('#billing_info :input').each(function(){
		//console.log(this.name);
		validateField(this);
	});
	
	//Loop through all billing address fields, IF NECESSARY
	if (!$('#shipping_sameas_billing').attr('checked')) {
		
		$('#shipping_address :input').each(function(){
			//console.log(this.name);
			validateField(this);
		});
	}
	
	if (!top.bValid) eval('f.'+top.strFirstFailure+'.focus()');
	return top.bValid;
}

function validateField(oInput,f) {
	if ($(oInput).attr('required') == 'required') {
		if ($(oInput).attr('type') == 'checkbox') {
			if (!oInput.checked) {
				addWarning(oInput);
				top.bValid = false;
				if (top.strFirstFailure == '') top.strFirstFailure = oInput.name;
			}
		} else if($(oInput).attr('type') == 'radio') {
			if (!getRadioOrCheckboxValue(f,oInput.name)) {
				addWarning(oInput);
				top.bValid = false;
				if (top.strFirstFailure == '') top.strFirstFailure = oInput.name;
			}
		} else {
			if (oInput.value == '') {
				addWarning(oInput);
				top.bValid = false;
				if (top.strFirstFailure == '') top.strFirstFailure = oInput.name;
			}
		}
	}
	if (oInput.value !== '') {
		if ($(oInput).attr('validationtype') == 'email') {
			if (!isValidEmail(oInput.value)) {
				addWarning(oInput,'E-mail must be a valid address in the format <em>user@website.com</em>');
				top.bValid = false;
				if (top.strFirstFailure == '') top.strFirstFailure = oInput.name;
			}
		}
		if ($(oInput).attr('validationtype') == 'phone') {
			if (oInput.value < 10 || !isNumeric(oInput.value)) {
				addWarning(oInput,'Phone number must only contain numbers, spaces, dashes and parentheses.');
				top.bValid = false;
				if (top.strFirstFailure == '') top.strFirstFailure = oInput.name;
			}
		}
		if ($(oInput).attr('validationtype') == 'zip') {
			if (oInput.value < 5 || !isNumeric(oInput.value)) {
				addWarning(oInput);
				top.bValid = false;
				if (top.strFirstFailure == '') top.strFirstFailure = oInput.name;
			}
		}
		if ($(oInput).attr('validationtype') == 'number') {
			if (!isNumeric(oInput.value)) {
				addWarning(oInput);
				top.bValid = false;
				if (top.strFirstFailure == '') top.strFirstFailure = oInput.name;
			}
		}
	}
}

function isNumeric(val) {
	var ValidChars = "0123456789.-()";
	for (i=0; i<val.length; i++) if (ValidChars.indexOf(val.charAt(i)) == -1) return false;
	return true;
}

function isValidEmail(val) {
	var iLen = val.length;
	if 	((iLen < 6) || (val.indexOf('@') < 1) || ((val.charAt(iLen - 3) != '.') && (val.charAt(iLen - 4) != '.') && (val.charAt(iLen - 5) != '.')) ) return false;
	return true;
}

function getRadioOrCheckboxValue(f,strName){
	var colEl = f.elements;
	var arValue = [];
	for (var i=0; i<colEl.length; i++){
		el = colEl[i];
		if (el.name && (el.name == strName) && el.checked) arValue[arValue.length]=el.value;
	}
	return arValue.join(',');
}

function addWarning(oInput, strWarning){
	if (!strWarning || strWarning.length < 1) {
	  if (oInput.title.length < 1) {
	    strWarning = "A valid "+oInput.name+" is required.";
	  } else {
	    strWarning = oInput.title;
	  }
	}
	$(oInput).parent().addClass('validation_warning');
	$(oInput).parent().append('<p class="warning">'+strWarning+'</p>');
}


}
/*
     FILE ARCHIVED ON 09:52:20 Dec 28, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 14:21:06 Oct 06, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 424.581
  exclusion.robots: 0.2
  exclusion.robots.policy: 0.188
  cdx.remote: 0.063
  esindex: 0.009
  LoadShardBlock: 380.351 (3)
  PetaboxLoader3.resolve: 276.43 (4)
  PetaboxLoader3.datanode: 150.875 (4)
  load_resource: 105.058
*/