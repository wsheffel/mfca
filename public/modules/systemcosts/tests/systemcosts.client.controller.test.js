'use strict';

(function() {
	// Systemcosts Controller Spec
	describe('Systemcosts Controller Tests', function() {
		// Initialize global variables
		var SystemcostsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Systemcosts controller.
			SystemcostsController = $controller('SystemcostsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Systemcost object fetched from XHR', inject(function(Systemcosts) {
			// Create sample Systemcost using the Systemcosts service
			var sampleSystemcost = new Systemcosts({
				name: 'New Systemcost'
			});

			// Create a sample Systemcosts array that includes the new Systemcost
			var sampleSystemcosts = [sampleSystemcost];

			// Set GET response
			$httpBackend.expectGET('systemcosts').respond(sampleSystemcosts);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.systemcosts).toEqualData(sampleSystemcosts);
		}));

		it('$scope.findOne() should create an array with one Systemcost object fetched from XHR using a systemcostId URL parameter', inject(function(Systemcosts) {
			// Define a sample Systemcost object
			var sampleSystemcost = new Systemcosts({
				name: 'New Systemcost'
			});

			// Set the URL parameter
			$stateParams.systemcostId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/systemcosts\/([0-9a-fA-F]{24})$/).respond(sampleSystemcost);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.systemcost).toEqualData(sampleSystemcost);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Systemcosts) {
			// Create a sample Systemcost object
			var sampleSystemcostPostData = new Systemcosts({
				name: 'New Systemcost'
			});

			// Create a sample Systemcost response
			var sampleSystemcostResponse = new Systemcosts({
				_id: '525cf20451979dea2c000001',
				name: 'New Systemcost'
			});

			// Fixture mock form input values
			scope.name = 'New Systemcost';

			// Set POST response
			$httpBackend.expectPOST('systemcosts', sampleSystemcostPostData).respond(sampleSystemcostResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Systemcost was created
			expect($location.path()).toBe('/systemcosts/' + sampleSystemcostResponse._id);
		}));

		it('$scope.update() should update a valid Systemcost', inject(function(Systemcosts) {
			// Define a sample Systemcost put data
			var sampleSystemcostPutData = new Systemcosts({
				_id: '525cf20451979dea2c000001',
				name: 'New Systemcost'
			});

			// Mock Systemcost in scope
			scope.systemcost = sampleSystemcostPutData;

			// Set PUT response
			$httpBackend.expectPUT(/systemcosts\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/systemcosts/' + sampleSystemcostPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid systemcostId and remove the Systemcost from the scope', inject(function(Systemcosts) {
			// Create new Systemcost object
			var sampleSystemcost = new Systemcosts({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Systemcosts array and include the Systemcost
			scope.systemcosts = [sampleSystemcost];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/systemcosts\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSystemcost);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.systemcosts.length).toBe(0);
		}));
	});
}());