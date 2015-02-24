'use strict';

angular.module('industry').controller('IndustryController', 
		['$scope', '$stateParams', '$location', 'Authentication', 'Industry', '$modal', '$log', '_',
	function($scope, $stateParams, $location, Authentication, Industry, $modal, $log, _) {
		$scope.authentication = Authentication;
		$scope.searchIndustry = '';
		$scope.isInput = '-active';

		$scope.create = function() {
			var industry = new Industry({
				//title: this.title,
				industry_name: this.industry_name
			});
			industry.$save(function(response) {
				$location.path('industry/' + response._id);

				//$scope.title = '';
				$scope.industry_name = '';
				
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(industry) {
			if (industry) {
				industry.$remove();

				for (var i in $scope.industries) {
					if ($scope.industries[i] === industry) {
						$scope.industries.splice(i, 1);
					}
				}
			} else {
				$scope.industry.$remove(function() {
					$location.path('industry');
				});
			}
		};

		$scope.update = function() {
			var industry = $scope.industry;

			industry.$update(function() {
				$location.path('industry/' + industry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.industries = Industry.query();
			console.log('industries...org.'+angular.toJson($scope.industries));
		};

		$scope.findOne = function() {
			$scope.industry = Industry.get({
				industryId: $stateParams.industryId
			});
		};
		

		/* Chart */
		/*var productPercentage   = dc.pieChart("#Product-Percentage"),    
	    inputCost = dc.barChart("#InputCost"),
	    outputCost = dc.barChart("#OutputCost");


        
    var data =  [
	    {
	        "company": "AAA1",
	        "product": 'Industry 1',
	        "InputCost": 10,
	        "OutputCost": 10,
	        "Percentage": 50
	    },
	    {
	        "company": "AAA2",
	        "product": 'Industry 2',
	        "InputCost": 500,
	        "OutputCost": 500,
	        "Percentage": 60
	    },
	    {
	        "company": "AAA3",
	        "product": 'Industry 3',
	        "InputCost": 400,
	        "OutputCost": 400,
	        "Percentage": 30
	    },
	    {
	        "company": "AAA9",
	        "product": 'Industry 4',
	        "InputCost": 800,
	        "OutputCost": 300,
	        "Percentage": 80
	    },
	    {
	        "company": "AAA4",
	        "product": 'Industry 5',
	        "InputCost": 500,
	        "OutputCost": 200,
	        "Percentage": 40
	    },
	    {
	        "company": "AAA5",
	        "product": 'Industry 6',
	        "InputCost": 100,
	        "OutputCost": 100,
	        "Percentage": 20
	    },
	    {
	        "company": "AAA8",
	        "product": 'Industry 7',
	        "InputCost": 500,
	        "OutputCost": 500,
	        "Percentage": 10
	    },
	    {
	        "company": "AAA6",
	        "product": 'Industry 8',
	        "InputCost": 500,
	        "OutputCost": 500,
	        "Percentage": 40
	    },
	    {
	        "company": "AAA7",
	        "product": 'Industry 9',
	        "InputCost": 700,
	        "OutputCost": 600,
	        "Percentage": 90
	    }
	];
		 var ndx = crossfilter(data),
	        productDim  = ndx.dimension(function(d) {return d.product;}),
	        PerProduct = productDim.group().reduceSum(function(d) {return +d.Percentage;}),
	        inputDimension = ndx.dimension(function (d) { return d.product; }),
	        inputCostGroup = inputDimension.group().reduceSum(function (d) { return d.InputCost; }),
	        outputDimension = ndx.dimension(function (d) { return d.product; }),
	        outputCostGroup = outputDimension.group().reduceSum(function (d) { return d.OutputCost;});

	    
	     productPercentage
	        .width(650).height(300)
	        .legend(dc.legend().x(10).y(70).itemHeight(13).gap(5))
	        .dimension(productDim)
	        .group(PerProduct)
	        .innerRadius(15)
	        .renderLabel(true)
	        .label(function (d) {
	            var label = d.value;
	            return label;
	        }) 
	        .renderTitle(true)
	        .ordinalColors(["#F44336","#E91E63","#9C27B0","#2196F3","#00BCD4","#8BC34A","#4CAF50","#FFEB3B","#FF5722","#FFC107"])


	    inputCost.width(300)
	        .height(200)
	        .x(d3.scale.ordinal())
	        .xUnits(dc.units.ordinal)
	        .brushOn(false)
	        .xAxisLabel("Product")
	        .yAxisLabel("Input Cost")
	        .dimension(inputDimension)
	        .barPadding(0.1)
	        .outerPadding(0.05)
	        .group(inputCostGroup)
	        .ordinalColors(["#9C27B0","#E91E63","#9C27B0","#F44336","#00BCD4","#8BC34A","#4CAF50","#FFEB3B","#FF5722","#FFC107"]);

	    outputCost.width(300)
	        .height(200)
	        .x(d3.scale.ordinal())
	        .xUnits(dc.units.ordinal)
	        .brushOn(false)
	        .xAxisLabel("Product")
	        .yAxisLabel("Output Cost")
	        .dimension(outputDimension)
	        .barPadding(0.1)
	        .outerPadding(0.05)
	        .group(outputCostGroup)
	        .ordinalColors(["#4CAF50","#E91E63","#9C27B0","#F44336","#00BCD4","#8BC34A","#4CAF50","#FFEB3B","#FF5722","#FFC107"]);
	  
	  
	    dc.renderAll();*/
	}
]);