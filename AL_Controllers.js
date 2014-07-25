angular.module("autoLoading.Controllers",["autoLoading.Services"])
.controller("bodyCtrl",function($scope){

})
.controller("switchCtrl",function($scope){
	$scope.pageStatus = true;

		//the switch button to switch the page status
		$scope.$watch("pageStatus",function(newValue,oldValue){
			if(newValue==true){
				$("#SearchDiv").fadeOut('slow',function(){
					$("#SendingQueueDiv").fadeIn('slow');
				})
			}else{
				$("#SendingQueueDiv").fadeOut('slow',function(){
					$("#SearchDiv").fadeIn('slow');
				})
			}
		})
	})
.controller("SendingCtrl",function($scope,htmlService){

	$scope.vpcData = [
	{VPCId:1,DepartureTime:"2014-05-04",Vessel:"MSC V1",Voyage:"FD546",POL:"CHIWAN",fileter:"",WithELV:1,IsFinalized:1,IsSend:0,Order:1},
	{VPCId:2,DepartureTime:"2014-05-05",Vessel:"MSC V2",Voyage:"FD546",POL:"YANTIAN",fileter:"",WithELV:1,IsFinalized:1,IsSend:0,Order:10},
	{VPCId:3,DepartureTime:"2014-05-06",Vessel:"MSC V3",Voyage:"FD546",POL:"CHIWAN",fileter:"",WithELV:1,IsFinalized:1,IsSend:0,Order:5},
	{VPCId:4,DepartureTime:"2014-05-07",Vessel:"MSC V4",Voyage:"FD546",POL:"YANTIAN",fileter:"",WithELV:1,IsFinalized:1,IsSend:0,Order:1},
	{VPCId:5,DepartureTime:"2014-05-08",Vessel:"MSC V5",Voyage:"FD546",POL:"YANTIAN",fileter:"",WithELV:1,IsFinalized:1,IsSend:-1,Order:0},
	{VPCId:6,DepartureTime:"2014-05-08",Vessel:"MSC V6",Voyage:"FD546",POL:"CHIWAN",fileter:"",WithELV:1,IsFinalized:1,IsSend:0,Order:2},
	{VPCId:7,DepartureTime:"2014-05-09",Vessel:"MSC V7",Voyage:"FD546",POL:"YANTIAN",fileter:"",WithELV:1,IsFinalized:0,IsSend:0,Order:999},
	{VPCId:8,DepartureTime:"2014-05-09",Vessel:"MSC V8",Voyage:"FD546",POL:"CHIWAN",fileter:"",WithELV:1,IsFinalized:0,IsSend:0,Order:999},
	{VPCId:9,DepartureTime:"2014-05-09",Vessel:"MSC V9",Voyage:"FD546",POL:"CHIWAN",fileter:"",WithELV:1,IsFinalized:0,IsSend:0,Order:999},
	{VPCId:10,DepartureTime:"2014-05-10",Vessel:"MSC V0",Voyage:"FD546",POL:"YANTIAN",fileter:"",WithELV:1,IsFinalized:0,IsSend:0,Order:999},
	{VPCId:11,DepartureTime:"2014-05-11",Vessel:"MSC V10",Voyage:"FD546",POL:"CHIWAN",fileter:"",WithELV:1,IsFinalized:0,IsSend:0,Order:999}
	];

	$scope.changeOrderData=[];

	$scope.enableChangeOrder = function(){
		$scope.changeOrderData = getEditableOriginalOrder();
		$("#enableChangeOrderBtn").hide();
		$("#editBtnDiv").show();
		$("#sendingTableDiv").fadeOut('slow',function(){
			$("#editTableDiv").fadeIn('slow');
		});
	}

	$scope.undoOrder = function(){
		$scope.changeOrderData = getEditableOriginalOrder();
	}

	$scope.cancelOrder = function(){
		$("#enableChangeOrderBtn").show();
		$("#editBtnDiv").hide();
		$("#editTableDiv").fadeOut('slow',function(){
			$("#sendingTableDiv").fadeIn('slow');
		});
	}

	$scope.saveOrder = function(){
		if(!CheckOrder()){
			alert("The duplicate issue happened on order. Please check again, thanks.")
			return;
		}
		alert("//TODO:ajax to sync the data.")
		SaveOrderData();
		$scope.cancelOrder();
		$scope.sendingQueue.sortByDirection("Order","ASC");
	}

	$scope.$watch('vpcData.length',function(){
		//$scope.vpcTableHeight = $scope.vpcData.length * 30 + 100 + 'px';
		$scope.vpcTableHeight = htmlService.calculateTableAutoHeight($scope.vpcData.length);
	})
	$scope.$watch('changeOrderData.length',function(){
		// $scope.eidtTableHeight = $scope.changeOrderData.length * 30 + 100 + 'px';
		$scope.eidtTableHeight = htmlService.calculateTableAutoHeight($scope.changeOrderData.length);
	})

	$scope.getBackgroundColor = function(sendingStatus,withELV,isFinalized){
		if(angular.isNumber(sendingStatus)){
			if(sendingStatus == "-1"){
				return "green";
			}else if(sendingStatus == "0"){
				if(withELV == 0 || isFinalized == 0){
					return "red";
				}else{
					return "lightgreen";	
				}

			}else if(sendingStatus == "1"){
				return "gray";
			}
		}else{
			return "gray"
		}
	}

	$scope.sendingQueue = {
		data:'vpcData',
		enableColumnResize: true,
		columnDefs:[
		{field:'Vessel'},
		{field:'Voyage'},
		{field:'POL'},
		{field:'DepartureTime'},
		{field:'WithELV', displayName:'With ELV',cellFilter:'toBoolean'},
		{field:'IsFinalized', displayName:'Is Finalized',cellFilter:'toBoolean'},
		{field:'fileter',cellFilter:'companyFilter'},
		{field:'IsSend',displayName:'Send Status',cellFilter:'sendingStatus'},
		{field:'Order'},
		],
		multiSelect:false,
		sortInfo:{fields:['Order'],directions:['asc']},
		rowTemplate:'<div ng-style="{ \'cursor\': row.cursor, \'background-color\': getBackgroundColor(row.getProperty(\'IsSend\'),row.getProperty(\'WithELF\'),row.getProperty(\'IsFinalized\')) }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell {{col.cellClass}}"><div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }">&nbsp;</div><div ng-cell></div></div>'
	};

	$scope.editOrderQueue = {
		data:'changeOrderData',
		enableColumnResize: true,
		columnDefs:[
		{field:'Vessel'},
		{field:'Voyage'},
		{field:'POL'},
		{field:'DepartureTime'},
		{field:'WithELV', displayName:'With ELV',cellFilter:'toBoolean'},
		{field:'IsFinalized', displayName:'Is Finalized',cellFilter:'toBoolean'},
		{field:'fileter',cellFilter:'companyFilter'},
		{field:'IsSend',displayName:'Send Status',cellFilter:'sendingStatus'},
		{field:'Order',enableCellEdit:true},
		],
		enableCellSelection: true,
		enableRowSelection: false,
		enableCellEditOnFocus: true,
		multiSelect:false,
		sortInfo:{fields:['DepartureTime'],directions:['asc']},
	}

	function getEditableOriginalOrder(){
		var data = $.map($scope.vpcData,function(v,i){
			if(v.WithELV == 1 && v.IsFinalized == 1 && v.IsSend ==0){
				return {
					VPCId:v.VPCId,
					DepartureTime:v.DepartureTime,
					Vessel:v.Vessel,
					Voyage:v.Voyage,
					POL:v.POL,
					WithELV:v.WithELV,
					IsFinalized:v.IsFinalized,
					IsSend:v.IsSend,
					Order:v.Order
				}
			}
		});
		return data;
	}

	function SaveOrderData(){
		$.each($scope.changeOrderData,function(ChangedI,changedV){
			$.each($scope.vpcData,function(originalI,originalV){
				if(originalV.WithELV == 1 && originalV.IsFinalized == 1 
					&& originalV.IsSend == 0 && originalV.VPCId == changedV.VPCId){
					originalV.Order = changedV.Order;
			}
		})
		})
	}

	function CheckOrder(){
		var tempData = [];
		var isValidate = true;
		$.each($scope.changeOrderData,function(i,v){
			if($.inArray(v.Order,tempData) == -1){
				tempData.push(v.Order);
			}else{
				isValidate = false;
				return false;
			}
		})
		return isValidate;
	}
})
.controller("SearchCtrl",function($scope,$http,htmlService){
	var searchData = [
	{VPCId:1,DepartureTime:'2014-07-24',VesselName:'MSC V1',VoyageNumber:'Search1',PortId:1,LoadPort:'CHIWAN',WithELV:1,IsFinalized:1,IsSend:1,SendingInfos:[]},
	{VPCId:2,DepartureTime:'2014-07-24',VesselName:'MSC V2',VoyageNumber:'Search2',PortId:1,LoadPort:'CHIWAN',WithELV:1,IsFinalized:1,IsSend:1,SendingInfos:[]},
	{VPCId:3,DepartureTime:'2014-07-24',VesselName:'MSC V3',VoyageNumber:'Search3',PortId:1,LoadPort:'CHIWAN',WithELV:1,IsFinalized:1,IsSend:0,SendingInfos:[]},
	{VPCId:4,DepartureTime:'2014-07-24',VesselName:'MSC V4',VoyageNumber:'Search4',PortId:1,LoadPort:'CHIWAN',WithELV:1,IsFinalized:1,IsSend:1,SendingInfos:[]},
	{VPCId:5,DepartureTime:'2014-07-24',VesselName:'MSC V5',VoyageNumber:'Search5',PortId:1,LoadPort:'CHIWAN',WithELV:1,IsFinalized:1,IsSend:1,SendingInfos:[]},
	{VPCId:6,DepartureTime:'2014-07-24',VesselName:'MSC V6',VoyageNumber:'Search6',PortId:1,LoadPort:'CHIWAN',WithELV:1,IsFinalized:1,IsSend:-1,SendingInfos:[]},
	{VPCId:7,DepartureTime:'2014-07-24',VesselName:'MSC V7',VoyageNumber:'Search7',PortId:1,LoadPort:'CHIWAN',WithELV:1,IsFinalized:1,IsSend:1,SendingInfos:[]},
	{VPCId:8,DepartureTime:'2014-07-24',VesselName:'MSC V8',VoyageNumber:'Search8',PortId:1,LoadPort:'CHIWAN',WithELV:1,IsFinalized:1,IsSend:1,SendingInfos:[]},
	{VPCId:9,DepartureTime:'2014-07-23',VesselName:'MSC V9',VoyageNumber:'Search9',PortId:1,LoadPort:'CHIWAN',WithELV:1,IsFinalized:1,IsSend:0,SendingInfos:[]},
	{VPCId:10,DepartureTime:'2014-07-24',VesselName:'MSC V10',VoyageNumber:'Search10',PortId:1,LoadPort:'CHIWAN',WithELV:1,IsFinalized:1,IsSend:1,SendingInfos:[]},
	{VPCId:11,DepartureTime:'2014-07-24',VesselName:'MSC V11',VoyageNumber:'Search11',PortId:1,LoadPort:'CHIWAN',WithELV:1,IsFinalized:1,IsSend:1,SendingInfos:[]}
	];

	$scope.searchResult = [];

	$scope.selectedVPC = {};

	$scope.searchCondition = {
		vessel: "",
		voyage:"",
		pol:"",
		company:""
	}

	$scope.$watch("searchResult.length",function(){
		$scope.searchTableHeight = htmlService.calculateTableAutoHeight($scope.searchResult.length);
	})

	$scope.Search = function(){
		var searchObj = $scope.searchCondition;
		alert("//TODO:search data from ajax.");
		$scope.searchResult = searchData;
	}

	$scope.isDetailBtnDisabled = function(entity){
		if(!entity){
			return true;
		}else{
			if(entity.IsSend == 1){
				return false;
			}
			return true;
		}

	}

	$scope.showDetails = function(entity){
		$scope.selectedVPC = entity;
		$("#vpcSendingDetailModal").modal("show");
	}

	$scope.searchGrid = {
		data:'searchResult',
		enableColumnResize: true,
		columnDefs:[
		{field:'VesselName',displayName:'Vessel'},
		{field:'VoyageNumber',displayName:'Voyage'},
		{field:'LoadPort',displayName:'Port'},
		{field:'DepartureTime'},
		{field:'WithELV', displayName:'With ELV',cellFilter:'toBoolean'},
		{field:'IsFinalized', displayName:'Is Finalized',cellFilter:'toBoolean'},
		{field:'IsSend',displayName:'Send Status',cellFilter:'sendingStatus'},
		{field:'sumInfo',displayName:'More', cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><button class="btn btn-primary btn-xs" ng-disabled="isDetailBtnDisabled(row.entity)" ng-click="showDetails(row.entity)">Details</button></div>'}
		],
		multiSelect:false,
		sortInfo:{fields:['DepartureTime'],directions:['desc']}
	}



});