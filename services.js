angular.module("customServices",[])
// .factory("logService",function(){
// 	var messageCount = 0;
// 	return{
// 		log:function(msg){
// 			console.log("(LOG + " + messageCount++ + ")" + msg );
// 		}
// 	};
// });
.provider("logService",function(){
	var counter = true;
	var debug = true;
	return{
		messageCounterEnabled:function(setting){
			if(angular.isDefined(setting)){
				counter = setting;
				return this;
			}else{
				return counter;
			}
		},
		debugEnabled:function(setting){
			if(angular.isDefined(setting)){
				debug=setting;
				return this;
			}else{
				return debug;
			}
		},
		$get:function(){
			return{
				messageCount:0,
				log:function(msg){
					if(debug){
						console.log("(LOG" + (counter ? " + " +this.messageCount++ + ")" : ") ") + msg);
					}
				}
			};
		}
	}
});