/**
 * auth.test.js
 * @description :: contains test cases of APIs for authentication module.
 */

const dotenv = require('dotenv');
dotenv.config();
process.env.NODE_ENV = 'test';
const db = require('mongoose');
const request = require('supertest');
const { MongoClient } = require('mongodb');
const app = require('../../app');
const authConstant = require('../../constants/authConstant');
const uri = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

/**
 * @description : model dependencies resolver
 */
beforeAll(async function (){
  try {
    await client.connect();
    const dbInstance = client.db('Dhiwise_test');

  }
  catch (error) {
    console.error(`we encountered ${error}`);
  }
  finally {
    client.close();
  }
});

// test cases

describe('POST /register -> if email and username is given', () => {
  test('should register a Admin', async () => {
    let registeredUser = await request(app)
      .post('/admin/auth/register')
      .send({
        'name':'Beth Champlin',
        'email':'Eulah.Herzog20@gmail.com',
        'phone':'(298) 310-7271',
        'password':'xiY0G0UN1dGufI1',
        'companyName':'TCP',
        'hobbies':'Bermuda',
        'bio':'input',
        'logo':'Steel',
        'userType':authConstant.USER_TYPES.Admin,
        'mobileNo':'(499) 591-1857'
      });
    expect(registeredUser.statusCode).toBe(200);
    expect(registeredUser.body.status).toBe('SUCCESS');
    expect(registeredUser.body.data).toMatchObject({ id: expect.any(String) });
  });
});

describe('POST /login -> if username and password is correct', () => {
  test('should return Admin with authentication token', async () => {
    let Admin = await request(app)
      .post('/admin/auth/login')
      .send(
        {
          username: 'Eulah.Herzog20@gmail.com',
          password: 'xiY0G0UN1dGufI1'
        }
      );
    expect(Admin.statusCode).toBe(200);
    expect(Admin.body.status).toBe('SUCCESS');
    expect(Admin.body.data).toMatchObject({
      id: expect.any(String),
      token: expect.any(String)
    }); 
  });
});

describe('POST /login -> if username is incorrect', () => {
  test('should return unauthorized status and Admin not exists', async () => {
    let Admin = await request(app)
      .post('/admin/auth/login')
      .send(
        {
          username: 'wrong.username',
          password: 'xiY0G0UN1dGufI1'
        }
      );

    expect(Admin.statusCode).toBe(400);
    expect(Admin.body.status).toBe('BAD_REQUEST');
  });
});

describe('POST /login -> if password is incorrect', () => {
  test('should return unauthorized status and incorrect password', async () => {
    let Admin = await request(app)
      .post('/admin/auth/login')
      .send(
        {
          username: 'Eulah.Herzog20@gmail.com',
          password: 'wrong@password'
        }
      );

    expect(Admin.statusCode).toBe(400);
    expect(Admin.body.status).toBe('BAD_REQUEST');
  });
});

describe('POST /login -> if username or password is empty string or has not passed in body', () => {
  test('should return bad request status and insufficient parameters', async () => {
    let Admin = await request(app)
      .post('/admin/auth/login')
      .send({});

    expect(Admin.statusCode).toBe(400);
    expect(Admin.body.status).toBe('BAD_REQUEST');
  });
});

describe('POST /forgot-password -> if email has not passed from request body', () => {
  test('should return bad request status and insufficient parameters', async () => {
    let Admin = await request(app)
      .post('/admin/auth/forgot-password')
      .send({ email: '' });

    expect(Admin.statusCode).toBe(400);
    expect(Admin.body.status).toBe('BAD_REQUEST');
  });
});

describe('POST /forgot-password -> if email passed from request body is not available in database ', () => {
  test('should return record not found status', async () => {
    let Admin = await request(app)
      .post('/admin/auth/forgot-password')
      .send({ 'email': 'unavailable.email@hotmail.com', });

    expect(Admin.statusCode).toBe(404);
    expect(Admin.body.status).toBe('RECORD_NOT_FOUND');
  });
});

describe('POST /forgot-password -> if email passed from request body is valid and OTP sent successfully', () => {
  test('should return success message', async () => {
    let Admin = await request(app)
      .post('/admin/auth/forgot-password')
      .send({ 'email':'Eulah.Herzog20@gmail.com', });

    expect(Admin.statusCode).toBe(200);
    expect(Admin.body.status).toBe('SUCCESS');
  });
});

describe('POST /validate-otp -> OTP is sent in request body and OTP is correct', () => {
  test('should return success', () => {
    return request(app)
      .post('/admin/auth/login')
      .send(
        {
          username: 'Eulah.Herzog20@gmail.com',
          password: 'xiY0G0UN1dGufI1'
        }).then(login => () => {
        return request(app)
          .get(`/admin/Admin/${login.body.data.id}`)
          .set({
            Accept: 'application/json',
            Authorization: `Bearer ${login.body.data.token}`
          }).then(foundUser => {
            return request(app)
              .post('/admin/auth/validate-otp')
              .send({ 'otp': foundUser.body.data.resetPasswordLink.code, }).then(Admin => {
                expect(Admin.statusCode).toBe(200);
                expect(Admin.body.status).toBe('SUCCESS');
              });
          });
      });
  });
});

describe('POST /validate-otp -> if OTP is incorrect or OTP has expired', () => {
  test('should return invalid OTP', async () => {
    let Admin = await request(app)
      .post('/admin/auth/validate-otp')
      .send({ 'otp': '12334' });
    
    expect(Admin.statusCode).toBe(200);
    expect(Admin.body.status).toBe('FAILURE');
    
  });
});

describe('POST /validate-otp -> if request body is empty or OTP has not been sent in body', () => {
  test('should return insufficient parameter', async () => {
    let Admin = await request(app)
      .post('/admin/auth/validate-otp')
      .send({});

    expect(Admin.statusCode).toBe(400);
    expect(Admin.body.status).toBe('BAD_REQUEST');
  });
});

describe('PUT /reset-password -> code is sent in request body and code is correct', () => {
  test('should return success', () => {
    return request(app)
      .post('/admin/auth/login')
      .send(
        {
          username: 'Eulah.Herzog20@gmail.com',
          password: 'xiY0G0UN1dGufI1'
        }).then(login => () => {
        return request(app)
          .get(`/admin/Admin/${login.body.data.id}`)
          .set({
            Accept: 'application/json',
            Authorization: `Bearer ${login.body.data.token}`
          }).then(foundUser => {
            return request(app)
              .put('/admin/auth/validate-otp')
              .send({
                'code': foundUser.body.data.resetPasswordLink.code,
                'newPassword':'newPassword'
              }).then(Admin => {
                expect(Admin.statusCode).toBe(200);
                expect(Admin.body.status).toBe('SUCCESS');
              });
          });
      });
  });
});

describe('PUT /reset-password -> if request body is empty or code/newPassword is not given', () => {
  test('should return insufficient parameter', async () => {
    let Admin = await request(app)
      .put('/admin/auth/reset-password')
      .send({});
    
    expect(Admin.statusCode).toBe(400);
    expect(Admin.body.status).toBe('BAD_REQUEST');
  });
});

describe('PUT /reset-password -> if code is invalid', () => {
  test('should return invalid code', async () => {
    let Admin = await request(app)
      .put('/admin/auth/reset-password')
      .send({
        'code': '123',
        'newPassword': 'testPassword'
      });

    expect(Admin.statusCode).toBe(200);
    expect(Admin.body.status).toBe('FAILURE');

  });
});

afterAll(function (done) {
  db.connection.db.dropDatabase(function () {
    db.connection.close(function () {
      done();
    });
  });
});
