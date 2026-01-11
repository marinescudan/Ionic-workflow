import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersApiService } from './users-api.service';

describe('UsersApiService', () => {
  let service: UsersApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersApiService],
    });

    service = TestBed.inject(UsersApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify no outstanding requests
    httpMock.verify();
  });

  it('should fetch all users', () => {
    const mockUsers = [
      { id: 1, name: 'John', email: 'john@example.com' },
      { id: 2, name: 'Jane', email: 'jane@example.com' },
    ];

    service.getAll().subscribe((users) => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('https://api.example.com/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should fetch user by ID', () => {
    const mockUser = { id: 1, name: 'John', email: 'john@example.com' };

    service.getById(1).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('https://api.example.com/users/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should create user', () => {
    const newUser = { name: 'John', email: 'john@example.com' };
    const createdUser = { id: 1, ...newUser };

    service.create(newUser).subscribe((user) => {
      expect(user).toEqual(createdUser);
    });

    const req = httpMock.expectOne('https://api.example.com/users');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(createdUser);
  });

  it('should handle error response', () => {
    const errorMessage = 'User not found';

    service.getById(999).subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error.status).toBe(404);
      },
    });

    const req = httpMock.expectOne('https://api.example.com/users/999');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
