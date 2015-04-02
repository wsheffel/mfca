'use strict';

// Systemcosts controller
angular.module('systemcosts').controller('SystemcostsController', 
		['$scope', '$stateParams', '$location', 'Authentication', 'Systemcosts', '_', 'Articles',
	function($scope, $stateParams, $location, Authentication, Systemcosts, _, Articles) {
		
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

		//select industry name
		$scope.selectedIndustry = "";
		$scope.industries = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Dakota","North Carolina","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];

		//select company name
		$scope.selectedCompany = "";
		$scope.companys = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Dakota","North Carolina","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];

		//select product name
		$scope.selectedProduct = "";
		$scope.product_name = "";
        $scope.company = {};
		$scope.products = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Dakota","North Carolina","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];

		/*Date control using for tracking product items*/
		/*Start*/
		
		$scope.clear = function () {
			$scope.dateofbirth = null;
		};


		$scope.openStartDate = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.openedStartDate = true;

		};
		
		$scope.openEndtDate = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.openedEndDate = true;

		};
		
		/*End*/
		
		$scope.init = function(){
			$scope.list_of_materials = [];			
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
			
			 Articles.query().$promise.then(function(response){
	                $scope.company = _.find(response, function(company){
	                    if(_.isEqual(company.user._id, $scope.authentication.user._id)){
	                        return true;
	                    }
	                });
	                $scope.company = $scope.company._id;
	            });
			 Systemcosts.query().$promise.then(function(response){
	                $scope.products = _.uniq(_.pluck(response, 'product_name'));
	            });
		};

		// addItem - push our new item 
		$scope.addItem = function(){
			 if(!_.isEmpty($scope.selectedProduct) && !_.isUndefined($scope.selectedProduct) &&
				!_.isEmpty($scope.input_item) && !_.isUndefined($scope.input_item) && 
				!_.isEmpty($scope.input_quantity) && !_.isUndefined($scope.input_quantity) && 
				!_.isEmpty($scope.input_price) && !_.isUndefined($scope.input_price)){
				$scope.new_material_item = {
					input_item: $scope.input_item,
					input_price: $scope.input_price,
					input_quantity: $scope.input_quantity,
					input_cost: $scope.input_cost,
					output_pamt_quantity: $scope.input_quantity,
					output_pamt_cost: $scope.output_pamt_cost,
					output_lamt_quantity: $scope.output_lamt_quantity,
					output_lamt_cost: $scope.output_lamt_cost,
					product_name: $scope.selectedProduct,
                    company: $scope.company
				};
				$scope.list_of_materials.push($scope.new_material_item);
				$scope.loadItems();
				$scope.clearItem();
				$scope.error = '';
				$scope.success = 'Item added successfully';
			}else{
				$scope.success = '';
				$scope.error = 'Data missing : Product, Item, Quantity, Cost';  //TODO : need more validation
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


        // Create new Typeofmaterial
       $scope.create = function() {
           var isSave = false;
           $scope.currentList = [];
           if(!_.isUndefined($scope.list_of_materials) &&
                   _.size($scope.list_of_materials) > 0){
               
               _.forEach($scope.list_of_materials, function (saveObj, index){
               
                   $scope.input_item = saveObj.input_item;
                   $scope.input_price = saveObj.input_price;
                   $scope.input_quantity = saveObj.input_quantity;
                   $scope.input_cost = saveObj.input_cost;
                   $scope.output_pamt_quantity = saveObj.output_pamt_quantity;
                   $scope.output_pamt_cost = saveObj.output_pamt_cost;
                   $scope.output_lamt_quantity = saveObj.output_lamt_quantity;
                   $scope.output_lamt_cost = saveObj.output_lamt_cost;
                   $scope.product_name = saveObj.product_name;
                   $scope.company = saveObj.company;
       
                   // Create new Systemcosts object
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
                       total_percentage: $scope.total_percentage,
                       product_name: $scope.product_name,
                       company: $scope.company,
                       startDate: $scope.startDate,
                       endDate: $scope.endDate	         
                   });

                   
                   
                   // Redirect after save
                   systemcost.$save(function(response) {   
                       
                       $scope.currentList.push(response);
                       
                       // Clear form fields
                       $scope.input_item = '';
                       $scope.input_price = ''
                       $scope.input_quantity = '';
                       $scope.input_cost = '';
                       $scope.output_pamt_quantity = '';
                       $scope.output_pamt_cost = '';
                       $scope.output_lamt_quantity = '';
                       $scope.output_lamt_cost = '';
                       //$scope.product_name = '';
                       
                       if(_.isEqual(_.size($scope.list_of_materials), (index+1))){
                           isSave = true;
                           console.log('isSavessdfsd...', isSave);
                       }
                       
                       if(isSave){
                           $location.path('systemcosts/product_type/'+$scope.product_name);
                       }
                       
                   }, function(errorResponse) {
                       $scope.error = errorResponse.data.message;
                   });
               });
               
           }
       };
		/*// Create new Systemcost
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
		};*/

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
			//$scope.systemcosts = Systemcosts.query();
			Systemcosts.query().$promise.then(function(response){
                 $scope.systemcost = _.groupBy(response, 'product_name');
             });
		};

		// Find existing Systemcost
		$scope.findOne = function() {
			/*$scope.systemcost = Systemcosts.get({ 
				systemcostId: $stateParams.systemcostId
			});*/
			
			if(!_.isEqual($stateParams.systemcostId, 'viewCurrent')){
                $scope.systemcost = [];
                $scope.systemcost.push(Systemcosts.get({ 
                	systemcostId: $stateParams.systemcostId
                }));
            } if(_.isEqual($stateParams.viewCurrentSystemCost, 'product_type')){
            	Systemcosts.query().$promise.then(function(response){
                    $scope.systemcost = _.filter(response, {'product_name' : $stateParams.systemcostId});
                });
            } else {
                $scope.systemcost = Systemcosts.get({ 
                	systemcostId: $stateParams.systemcostId
                });
                
            }
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
			$scope.currentItem = {};
            $scope.isEditForm = false;
			$scope.loadItems();
		};

		$scope.init();
	}
]);