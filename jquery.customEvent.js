$.removeCustomEvent = function(elem,eventName){
  	elem = $(elem);
		var customEventAttr = 'customEventKey_'+eventName ;
		var customEventKey = elem.attr(customEventAttr);
		if( typeof window.customEvent[customEventKey] !== 'undefined'){
			window.customEvent[customEventKey] = false;
		}
	}
	$.addCustomEvent = function(elem,eventName,timeout,fnState){
		if( typeof elem === 'string' ){
			elem = $(elem).get(0);
		}
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
	}
	
	$('input#file_id').livequery(function(){
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
		$('input#file_id').bind('dataChanged',function(){console.log($(this).val())})
	});
