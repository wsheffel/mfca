'use strict';

(function() {
	// Typeofmaterials Controller Spec
	describe('Typeofmaterials Controller Tests', function() {
		// Initialize global variables
		var TypeofmaterialsController,
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

			// Initialize the Typeofmaterials controller.
			TypeofmaterialsController = $controller('TypeofmaterialsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Typeofmaterial object fetched from XHR', inject(function(Typeofmaterials) {
			// Create sample Typeofmaterial using the Typeofmaterials service
			var sampleTypeofmaterial = new Typeofmaterials({
				name: 'New Typeofmaterial'
			});

			// Create a sample Typeofmaterials array that includes the new Typeofmaterial
			var sampleTypeofmaterials = [sampleTypeofmaterial];

			// Set GET response
			$httpBackend.expectGET('typeofmaterials').respond(sampleTypeofmaterials);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.typeofmaterials).toEqualData(sampleTypeofmaterials);
		}));

		it('$scope.findOne() should create an array with one Typeofmaterial object fetched from XHR using a typeofmaterialId URL parameter', inject(function(Typeofmaterials) {
			// Define a sample Typeofmaterial object
			var sampleTypeofmaterial = new Typeofmaterials({
				name: 'New Typeofmaterial'
			});

			// Set the URL parameter
			$stateParams.typeofmaterialId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/typeofmaterials\/([0-9a-fA-F]{24})$/).respond(sampleTypeofmaterial);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.typeofmaterial).toEqualData(sampleTypeofmaterial);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Typeofmaterials) {
			// Create a sample Typeofmaterial object
			var sampleTypeofmaterialPostData = new Typeofmaterials({
				name: 'New Typeofmaterial'
			});

			// Create a sample Typeofmaterial response
			var sampleTypeofmaterialResponse = new Typeofmaterials({
				_id: '525cf20451979dea2c000001',
				name: 'New Typeofmaterial'
			});

			// Fixture mock form input values
			scope.name = 'New Typeofmaterial';

			// Set POST response
			$httpBackend.expectPOST('typeofmaterials', sampleTypeofmaterialPostData).respond(sampleTypeofmaterialResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Typeofmaterial was created
			expect($location.path()).toBe('/typeofmaterials/' + sampleTypeofmaterialResponse._id);
		}));

		it('$scope.update() should update a valid Typeofmaterial', inject(function(Typeofmaterials) {
			// Define a sample Typeofmaterial put data
			var sampleTypeofmaterialPutData = new Typeofmaterials({
				_id: '525cf20451979dea2c000001',
				name: 'New Typeofmaterial'
			});

			// Mock Typeofmaterial in scope
			scope.typeofmaterial = sampleTypeofmaterialPutData;

			// Set PUT response
			$httpBackend.expectPUT(/typeofmaterials\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/typeofmaterials/' + sampleTypeofmaterialPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid typeofmaterialId and remove the Typeofmaterial from the scope', inject(function(Typeofmaterials) {
			// Create new Typeofmaterial object
			var sampleTypeofmaterial = new Typeofmaterials({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Typeofmaterials array and include the Typeofmaterial
			scope.typeofmaterials = [sampleTypeofmaterial];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/typeofmaterials\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleTypeofmaterial);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.typeofmaterials.length).toBe(0);
		}));
	});
}());