// Example Initialization
  // Add event name called "dataChanged"
	
	$.addCustomEvent( 'input#file_id','dataChanged',500,function(elem){
		elem = $(elem);
		var hasOldValue = $(elem).attr('hasOldValue');
		var firstInit = false;
		
		if( !hasOldValue ){
			firstInit = true;	
			$(elem).attr('hasOldValue',true);
		}
		
		var oldValue = $(elem).data('oldValue');
		var currentValue = $(elem).val();
		$(elem).data('oldValue',currentValue);
		return (oldValue !== currentValue) || firstInit;
		
		//console.log(elem.val());
	});
	
	// Add event handler for recently created custom event 
	// called "dataChanged"
	
	$('input#file_id').bind('dataChanged',function(){
		console.log($(this).val());
	});
