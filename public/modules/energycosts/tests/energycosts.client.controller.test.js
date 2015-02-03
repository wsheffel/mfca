'use strict';

(function() {
	// Energycosts Controller Spec
	describe('Energycosts Controller Tests', function() {
		// Initialize global variables
		var EnergycostsController,
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

			// Initialize the Energycosts controller.
			EnergycostsController = $controller('EnergycostsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Energycost object fetched from XHR', inject(function(Energycosts) {
			// Create sample Energycost using the Energycosts service
			var sampleEnergycost = new Energycosts({
				name: 'New Energycost'
			});

			// Create a sample Energycosts array that includes the new Energycost
			var sampleEnergycosts = [sampleEnergycost];

			// Set GET response
			$httpBackend.expectGET('energycosts').respond(sampleEnergycosts);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.energycosts).toEqualData(sampleEnergycosts);
		}));

		it('$scope.findOne() should create an array with one Energycost object fetched from XHR using a energycostId URL parameter', inject(function(Energycosts) {
			// Define a sample Energycost object
			var sampleEnergycost = new Energycosts({
				name: 'New Energycost'
			});

			// Set the URL parameter
			$stateParams.energycostId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/energycosts\/([0-9a-fA-F]{24})$/).respond(sampleEnergycost);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.energycost).toEqualData(sampleEnergycost);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Energycosts) {
			// Create a sample Energycost object
			var sampleEnergycostPostData = new Energycosts({
				name: 'New Energycost'
			});

			// Create a sample Energycost response
			var sampleEnergycostResponse = new Energycosts({
				_id: '525cf20451979dea2c000001',
				name: 'New Energycost'
			});

			// Fixture mock form input values
			scope.name = 'New Energycost';

			// Set POST response
			$httpBackend.expectPOST('energycosts', sampleEnergycostPostData).respond(sampleEnergycostResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Energycost was created
			expect($location.path()).toBe('/energycosts/' + sampleEnergycostResponse._id);
		}));

		it('$scope.update() should update a valid Energycost', inject(function(Energycosts) {
			// Define a sample Energycost put data
			var sampleEnergycostPutData = new Energycosts({
				_id: '525cf20451979dea2c000001',
				name: 'New Energycost'
			});

			// Mock Energycost in scope
			scope.energycost = sampleEnergycostPutData;

			// Set PUT response
			$httpBackend.expectPUT(/energycosts\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/energycosts/' + sampleEnergycostPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid energycostId and remove the Energycost from the scope', inject(function(Energycosts) {
			// Create new Energycost object
			var sampleEnergycost = new Energycosts({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Energycosts array and include the Energycost
			scope.energycosts = [sampleEnergycost];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/energycosts\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEnergycost);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.energycosts.length).toBe(0);
		}));
	});
}());