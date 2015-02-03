'use strict';

(function() {
	// Materiallosses Controller Spec
	describe('Materiallosses Controller Tests', function() {
		// Initialize global variables
		var MateriallossesController,
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

			// Initialize the Materiallosses controller.
			MateriallossesController = $controller('MateriallossesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Materialloss object fetched from XHR', inject(function(Materiallosses) {
			// Create sample Materialloss using the Materiallosses service
			var sampleMaterialloss = new Materiallosses({
				name: 'New Materialloss'
			});

			// Create a sample Materiallosses array that includes the new Materialloss
			var sampleMateriallosses = [sampleMaterialloss];

			// Set GET response
			$httpBackend.expectGET('materiallosses').respond(sampleMateriallosses);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.materiallosses).toEqualData(sampleMateriallosses);
		}));

		it('$scope.findOne() should create an array with one Materialloss object fetched from XHR using a materiallossId URL parameter', inject(function(Materiallosses) {
			// Define a sample Materialloss object
			var sampleMaterialloss = new Materiallosses({
				name: 'New Materialloss'
			});

			// Set the URL parameter
			$stateParams.materiallossId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/materiallosses\/([0-9a-fA-F]{24})$/).respond(sampleMaterialloss);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.materialloss).toEqualData(sampleMaterialloss);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Materiallosses) {
			// Create a sample Materialloss object
			var sampleMateriallossPostData = new Materiallosses({
				name: 'New Materialloss'
			});

			// Create a sample Materialloss response
			var sampleMateriallossResponse = new Materiallosses({
				_id: '525cf20451979dea2c000001',
				name: 'New Materialloss'
			});

			// Fixture mock form input values
			scope.name = 'New Materialloss';

			// Set POST response
			$httpBackend.expectPOST('materiallosses', sampleMateriallossPostData).respond(sampleMateriallossResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Materialloss was created
			expect($location.path()).toBe('/materiallosses/' + sampleMateriallossResponse._id);
		}));

		it('$scope.update() should update a valid Materialloss', inject(function(Materiallosses) {
			// Define a sample Materialloss put data
			var sampleMateriallossPutData = new Materiallosses({
				_id: '525cf20451979dea2c000001',
				name: 'New Materialloss'
			});

			// Mock Materialloss in scope
			scope.materialloss = sampleMateriallossPutData;

			// Set PUT response
			$httpBackend.expectPUT(/materiallosses\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/materiallosses/' + sampleMateriallossPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid materiallossId and remove the Materialloss from the scope', inject(function(Materiallosses) {
			// Create new Materialloss object
			var sampleMaterialloss = new Materiallosses({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Materiallosses array and include the Materialloss
			scope.materiallosses = [sampleMaterialloss];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/materiallosses\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMaterialloss);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.materiallosses.length).toBe(0);
		}));
	});
}());