	/*
	@filename jquery.customEvent.js
	@author bbd33
	@mail damardotnet@gmail.com
	@site https://github.com/bbd33/jquery-plugin
	*/
	
	// Add Custom event to HTML element then fired 
	// by state of the specified user function 
	

	$.addCustomEvent = function(elem,eventName,timeout,fnState){
		elem = $(elem);
		if( !$(elem).length )
			return;
		if( typeof window.customEvent === 'undefined' ){
			window.customEvent = {};
		}
		var customEventKey = "customEvent_"+Math.random().toString().replace(/\D/,'');
		window.customEvent[customEventKey] = true;
		
		$(elem).attr('customEventKey_'+eventName, customEventKey);
		
		function eventLoop(){
			setTimeout(function(){
				if( fnState(elem) ){
					$(elem).trigger(eventName);
				}
				if(window.customEvent[customEventKey])
					eventLoop();
			},timeout)
		}
		
		eventLoop();
	};
	// Remove Custome event for being fired again
	
	$.removeCustomEvent = function(elem,eventName){
  		elem = $(elem);
		var customEventAttr = 'customEventKey_'+eventName ;
		var customEventKey = elem.attr(customEventAttr);
		if( typeof window.customEvent[customEventKey] !== 'undefined'){
			window.customEvent[customEventKey] = false;
		}
	}
	
	// Example Initialization
	// Add event name called "dataChenged"
	
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
	// called "dataChenged"
	
	$('input#file_id').bind('dataChanged',function(){
		console.log($(this).val());
	});
	

