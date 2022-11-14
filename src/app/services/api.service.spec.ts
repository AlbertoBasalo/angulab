import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { UtilsService } from './utils.service';

describe('Teh API Service', () => {
  let service: ApiService;
  // ! http client spy and mock
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // ! http client module double
      providers: [
        {
          provide: UtilsService,
          useValue: {
            getHyphened: (source: string) => 'space-y',
          },
        },
      ],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // not forget to check all of your requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the http client get method with the right url', () => {
    // Arrange
    // Act
    service.getAgencies$().subscribe();
    // Assert
    const expectedUrl = 'http://localhost:3000/agencies';
    const controller = httpTestingController.expectOne(expectedUrl);
    const expectedMethod = 'GET';
    expect(controller.request.method).toEqual(expectedMethod);
  });

  it('should return right data when calling get method ', () => {
    // Arrange
    const expected = [
      {
        id: 'space-y',
        name: 'Space Y',
        range: 'Interplanetary',
        status: 'Active',
      },
      {
        id: 'green-origin',
        name: 'Green Origin',
        range: 'Orbital',
        status: 'Active',
      },
    ];
    // Act
    service.getAgencies$().subscribe((actual) => {
      // Assert
      expect(actual).toEqual(expected);
    });
    const expectedUrl = 'http://localhost:3000/agencies';
    const controller = httpTestingController.expectOne(expectedUrl);
    controller.flush(expected);
  });

  it('should call post method with the right url and payload', () => {
    // Arrange
    const input = {
      id: '',
      name: 'Space Y',
      range: 'Interplanetary',
      status: 'Active',
    };
    // Act
    service.postAgency$(input).subscribe();
    // Assert
    const expectedUrl = 'http://localhost:3000/agencies';
    const controller = httpTestingController.expectOne(expectedUrl);
    const expectedMethod = 'POST';
    expect(controller.request.method).toEqual(expectedMethod);
    const expected = {
      id: 'space-y',
      name: 'Space Y',
      range: 'Interplanetary',
      status: 'Active',
    };
    expect(controller.request.body).toEqual(expected);
  });

  it('should call the delete method with the right url', () => {
    // Arrange
    const input = 'space-y';
    // Act
    service.deleteAgency$(input).subscribe();
    // Assert
    const expectedUrl = 'http://localhost:3000/agencies/space-y';
    const controller = httpTestingController.expectOne(expectedUrl);
    const expectedMethod = 'DELETE';
    expect(controller.request.method).toEqual(expectedMethod);
  });
});
