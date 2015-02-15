'use strict';

(function() {
	// Industry Controller Spec
	describe('IndustryController', function() {
		// Initialize global variables
		var IndustryController,
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

			// Initialize the Industry controller.
			IndustryController = $controller('IndustryController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one industry object fetched from XHR', inject(function(Industry) {
			// Create sample industry using the Industry service
			var sampleIndustry = new Industry({
				industry_name: 'Automotive'
			});

			// Create a sample industries array that includes the new industry
			var sampleIndustries = [sampleIndustry];

			// Set GET response
			$httpBackend.expectGET('industry').respond(sampleIndustries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.industries).toEqualData(sampleIndustries);
		}));

		it('$scope.findOne() should create an array with one industry object fetched from XHR using a industryId URL parameter', inject(function(Industry) {
			// Define a sample industry object
			var sampleIndustry = new Industry({
				industry_name: 'Automotive'
			});

			// Set the URL parameter
			$stateParams.industryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/industry\/([0-9a-fA-F]{24})$/).respond(sampleIndustry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.industry).toEqualData(sampleIndustry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Industry) {
			// Create a sample industry object
			var sampleInustryPostData = new Industry({
				industry_name: 'Automotive'
			});

			// Create a sample industry response
			var sampleIndustryResponse = new Industry({
				_id: '525cf20451979dea2c000001',
				industry_name: 'Automotive'
			});

			// Fixture mock form input values
			scope.industry_name = 'Automotive';

			// Set POST response
			$httpBackend.expectPOST('industry', sampleInustryPostData).respond(sampleIndustryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.industry_name).toEqual('');

			// Test URL redirection after the industry was created
			expect($location.path()).toBe('/industry/' + sampleIndustryResponse._id);
		}));

		it('$scope.update() should update a valid industry', inject(function(Industry) {
			// Define a sample industry put data
			var sampleIndustryPutData = new Industry({
				_id: '525cf20451979dea2c000001',
				industry_name: 'Automotive'
			});

			// Mock industry in scope
			scope.industry = sampleIndustryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/industry\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/industry/' + sampleIndustryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid industryId and remove the industry from the scope', inject(function(Industry) {
			// Create new industry object
			var sampleIndustry = new Industry({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new industries array and include the industry
			scope.industries = [sampleIndustry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/industry\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleIndustry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.industries.length).toBe(0);
		}));
	});
}());