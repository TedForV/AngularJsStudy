angular.module("autoLoading.Services",[])
.factory("htmlService",function(){
	return{
		calculateTableAutoHeight:function(dataRowCount){
			return dataRowCount * 30 + 100 + 'px';
		}
	};
});