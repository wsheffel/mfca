'use strict';

// Systemcosts controller
angular.module('systemcosts').controller('SystemcostsController', 
		['$scope', '$stateParams', '$location', 'Authentication', 'Systemcosts', '_',
	function($scope, $stateParams, $location, Authentication, Systemcosts, _) {
		
		$scope.authentication = Authentication;
		$scope.isCollapsedIn = true;
		$scope.isInput='-active';
		$scope.isOutput='';
		$scope.isCollapsedOut = false;
		$scope.input_price = 0;
		$scope.input_quantity = 0;
		$scope.input_cost = 0;
		$scope.output_pamt_quantity = 0;
		$scope.output_pamt_cost = 0;
		$scope.output_lamt_quantity = 0;
		$scope.output_lamt_cost = 0;
		$scope.result_per=0;
		$scope.total_inputQuantity = 0;
		$scope.total_result = 0;
		$scope.total_input_cost = 0;
		$scope.total_ProdQuantity=0;
		$scope.total_ProdCost = 0;
		$scope.total_LossQuantity=0;
		$scope.total_LossCost = 0;
		$scope.total_percentage = 0;
		
		// newly added
		$scope.isEditForm = false;
		$scope.currentItem = {};

		$scope.init = function(){
			$scope.list_of_materials = [];
			/*$scope.list_of_materials = [{
				input_item:'LPDS material',
				input_price:10.7,
				input_quantity: 53330,
				input_cost:570442,
				output_pamt_quantity:40000,
				output_pamt_cost:427858,
				output_lamt_quantity:13330,
				output_lamt_cost:142584,
				result_per:0
			},
			{
				input_item:'DFR material',
				input_price:1.22,
				input_quantity: 57970,
				input_cost:70565,
				output_pamt_quantity:40000,
				output_pamt_cost:48691,
				output_lamt_quantity:17970,
				output_lamt_cost:21874,
				result_per:0
			},
			{
				input_item:'Protection film',
				input_price:0.69,
				input_quantity: 56340,
				input_cost:38786,
				output_pamt_quantity:40000,
				output_pamt_cost:27537,
				output_lamt_quantity:16340,
				output_lamt_cost:11249,
				result_per:0
			},
			{
				input_item:'Development chemical',
				input_price:2.37,
				input_quantity: 1000,
				input_cost:2370,
				output_pamt_quantity:0,
				output_pamt_cost:0,
				output_lamt_quantity:1000,
				output_lamt_cost:2370,
				result_per:0
			},
			{
				input_item:'Etching chemical',
				input_price:0.15,
				input_quantity: 75700,
				input_cost:11250,
				output_pamt_quantity:0,
				output_pamt_cost:0,
				output_lamt_quantity:75700,
				output_lamt_cost:11250,
				result_per:0
			},
			{
				input_item:'Release agent',
				input_price:0.23,
				input_quantity: 1700,
				input_cost:394,
				output_pamt_quantity:0,
				output_pamt_cost:0,
				output_lamt_quantity:1700,
				output_lamt_cost:394,
				result_per:0
			}];*/
			$scope.loadItems();
		};
		$scope.sumItems = function(data){
			$scope.total_result = 0;
			_.forEach(data, function(result){ 
				if(!_.isUndefined(result)){
					$scope.total_result += parseInt(result);
				}            	
        	});
		};		
		$scope.loadItems = function(){
			//Total input quantity
			var total_arrinputQuantity = _.flatten($scope.list_of_materials, 'input_quantity');
			$scope.sumItems(total_arrinputQuantity);
			//console.log($scope.total_result);
			$scope.total_inputQuantity = $scope.total_result;
			
			//Total input cost
			var total_arrinputCost = _.flatten($scope.list_of_materials, 'input_cost');
			$scope.sumItems(total_arrinputCost);
			$scope.total_input_cost = $scope.total_result;

			//Total output product quantity
			$scope.total_result = 0;
			var total_arrProdQuantity = _.flatten($scope.list_of_materials, 'output_pamt_quantity');
			$scope.sumItems(total_arrProdQuantity);
			$scope.total_ProdQuantity = $scope.total_result;
			
			//Total output product cost
			$scope.total_result = 0;
			var total_arrProdCost = _.flatten($scope.list_of_materials, 'output_pamt_cost');
			$scope.sumItems(total_arrProdCost);
			$scope.total_ProdCost = $scope.total_result;

			//Total output Loss quantity
			$scope.total_result = 0;
			var total_arrLossQuantity = _.flatten($scope.list_of_materials, 'output_lamt_quantity');
			$scope.sumItems(total_arrLossQuantity);
			$scope.total_LossQuantity = $scope.total_result;
			
			//Total output Loss cost
			$scope.total_result = 0;
			var total_arrLossCost = _.flatten($scope.list_of_materials, 'output_lamt_cost');
			$scope.sumItems(total_arrLossCost);
			$scope.total_LossCost = $scope.total_result;

			//Total output %
			$scope.total_percentage = $scope.total_LossQuantity / $scope.total_inputQuantity;
		};

		// addItem - push our new item 
		$scope.addItem = function(){
			if(!_.isEmpty($scope.input_item) && !_.isUndefined($scope.input_item) && 
				!_.isEmpty($scope.input_quantity) && !_.isUndefined($scope.input_quantity) && 
				!_.isEmpty($scope.input_price) && !_.isUndefined($scope.input_price)){
				$scope.new_material_item = {
					input_item: $scope.input_item,
					input_price: $scope.input_price,
					input_quantity: $scope.input_quantity,
					input_cost: $scope.input_cost,
					output_pamt_quantity: $scope.output_pamt_quantity,
					output_pamt_cost: $scope.output_pamt_cost,
					output_lamt_quantity: $scope.output_lamt_quantity,
					output_lamt_cost: $scope.output_lamt_cost
				};
				$scope.list_of_materials.push($scope.new_material_item);
				$scope.loadItems();
				$scope.clearItem();
				$scope.error = '';
				$scope.success = 'Item added successfully';
			}else{
				$scope.success = '';
				$scope.error = 'Data missing : Item, Quantity, Cost';  //TODO : need more validation
			}
		};
		$scope.closeAlert = function(){
			$scope.success = '';
			$scope.error = '';
		};
		// Toggle Input / Output panel
		$scope.toggleInOut = function(isActive){
			if(_.isEqual(isActive, false)){
				$scope.isCollapsedIn = false;
				$scope.isCollapsedOut = true;
				$scope.isInput='';
				$scope.isOutput='-active';
			}else{
				$scope.isCollapsedIn = true;
				$scope.isCollapsedOut = false;
				$scope.isInput='-active';
				$scope.isOutput='';
			}	
		};

		$scope.clearItem = function(){
			$scope.input_item = '';
			$scope.input_price = 0;
			$scope.input_quantity = 0;
			$scope.input_cost = 0;
		};

		// Create new Systemcost
		$scope.create = function() {
			$scope.input_item = $scope.list_of_materials[0].input_item;
			$scope.input_price = $scope.list_of_materials[0].input_price;
			$scope.input_quantity = $scope.list_of_materials[0].input_quantity;
			$scope.input_cost = $scope.list_of_materials[0].input_cost;
			$scope.output_pamt_quantity = $scope.list_of_materials[0].output_pamt_quantity;
			$scope.output_pamt_cost = $scope.list_of_materials[0].output_pamt_cost;
			$scope.output_lamt_quantity = $scope.list_of_materials[0].output_lamt_quantity;
			$scope.output_lamt_cost = $scope.list_of_materials[0].output_lamt_cost;

			// Create new Systemcost object
			var systemcost = new Systemcosts ({
				input_item: $scope.input_item,
				input_price: $scope.input_price,
				input_quantity: $scope.input_quantity,
				input_cost: $scope.input_cost,
				output_pamt_quantity: $scope.output_pamt_quantity,
				output_pamt_cost: $scope.output_pamt_cost,
				output_lamt_quantity: $scope.output_lamt_quantity,
				output_lamt_cost: $scope.output_lamt_cost,
				total_inputQuantity: $scope.total_inputQuantity,
				total_input_cost: $scope.total_input_cost,
				total_ProdQuantity: $scope.total_ProdQuantity,
				total_ProdCost: $scope.total_ProdCost,
				total_LossQuantity: $scope.total_LossQuantity,
				total_LossCost: $scope.total_LossCost,
				total_percentage: $scope.total_percentage
			});
			

			// Redirect after save
			systemcost.$save(function(response) {
				$location.path('systemcosts/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Systemcost
		$scope.remove = function(systemcost) {
			if ( systemcost ) { 
				systemcost.$remove();

				for (var i in $scope.systemcosts) {
					if ($scope.systemcosts [i] === systemcost) {
						$scope.systemcosts.splice(i, 1);
					}
				}
			} else {
				$scope.systemcost.$remove(function() {
					$location.path('systemcosts');
				});
			}
		};

		// Update existing Systemcost
		$scope.update = function() {
			var systemcost = $scope.systemcost;

			systemcost.$update(function() {
				$location.path('systemcosts/' + systemcost._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Systemcosts
		$scope.find = function() {
			$scope.systemcosts = Systemcosts.query();
		};

		// Find existing Systemcost
		$scope.findOne = function() {
			$scope.systemcost = Systemcosts.get({ 
				systemcostId: $stateParams.systemcostId
			});
		};
		
		// added by tech-works
		$scope.editSystemCost = function(currentItem) {
			$scope.currentItem = {};
			$scope.currentItem = _.cloneDeep(currentItem);
			$scope.isEditForm = true;
		};
		
		$scope.updateItem = function(){
			var updatedItemIndex = _.findIndex($scope.list_of_materials, function(item) 
					{ return _.isEqual(item.input_item, $scope.currentItem.input_item); });
			_.assign($scope.list_of_materials[updatedItemIndex], $scope.currentItem);
			$scope.currentItem = {};
			$scope.isEditForm = false;
			$scope.loadItems();
		};
		
		$scope.deleteSystemCost = function(currentItem) {
			_.remove($scope.list_of_materials, function(item) 
					{ return _.isEqual(item.input_item, currentItem.input_item); });
			$scope.loadItems();
		};

		$scope.init();
	}
]);