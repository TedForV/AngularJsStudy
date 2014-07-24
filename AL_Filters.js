angular.module("autoLoading.Filter",[])
.filter("toBoolean",function(){
		return function (value){
			if(angular.isNumber(value)){
				if(value == 1){
					return "true";
				}else if(value == 0){
					return "false";
				}
			}else{
				return "Undefined";
			}
		}
	})
	.filter("sendingStatus",function(){
		return function(value){
			if(angular.isNumber(value)){
				if(value == 1){
					return "Sended";
				}else if(value == 0){
					return "Waiting...";
				}else if(value == -1){
					return "Sending...";
				}
			}else{
				return "Undefined";
			}
		}
	})
	.filter("companyFilter",function(){
		return function(value){
			if(value && angular.isString(value)){
				return value;
			}else{
				return "All Company";
			}
		}
	})