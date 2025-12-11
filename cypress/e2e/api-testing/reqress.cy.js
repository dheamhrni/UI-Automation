const API_KEY = Cypress.env('REQRES_API_KEY');
import userData from "../../fixtures/userData.json";

// Pastikan key ada sebelum menjalankan test
if (!API_KEY) {
    throw new Error("REQRES_API_KEY tidak ditemukan di cypress.env.json");
}


describe('Scenario: API Testing with ReqRes GET', () => {
    let createdUserId;
    it('01 List Users - GET Request', () => {
        cy.request({
            method: 'GET', 
            url: 'https://reqres.in/api/users?page=2',
            headers: {
                'x-api-key':'reqres-free-v1'
            }
        })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('page', 2)
                expect(response.body.data).to.be.an('array')
            })
    })
     it('02 single user - GET Request', () => {
            cy.request({
                method: 'GET',
                url: 'https://reqres.in/api/users/2',
                headers: {
                    'x-api-key':'reqres-free-v1'
                }
            })
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body.data).to.have.property('id', 2)
                    expect(response.body.data).to.have.property('email')
                    expect(response.body.data).to.have.property('first_name')
                    expect(response.body.data).to.have.property('last_name')
                })
    })
});
   describe('Scenario: API Testing with ReqRes POST', () => {
    it('03 Create User - POST Request', () => {
        const userData = {
                name: 'Dhea Karina',
                job: 'Software Developer'
            };
        cy.request({
            method: 'POST', 
            url: 'https://reqres.in/api/users',
            headers: {
                'x-api-key': API_KEY
            },
            body: userData
        })
            .then((response) => {
                expect(response.status).to.equal(201)
                expect(response.body.name).to.eq(userData.name)
                expect(response.body.job).to.eq(userData.job)
                expect(response.body).to.have.property('id').and.to.be.a('string')
                expect(response.body).to.have.property('createdAt').and.to.be.a('string')
            })
    }) 
    it('04 Register - POST Request', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/register',
            headers: {
                'x-api-key': API_KEY
            },
            body: {
                email: 'eve.holt@reqres.in',
                password: 'pistol'
            }
        })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('id')
                expect(response.body).to.have.property('token')
            })
    })
    it('05 Register Unsuccessful - POST Request', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/register',
            headers: {
                'x-api-key': API_KEY
            },
            body: {
                email: 'sydney@fife'
            },
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body).to.have.property('error', 'Missing password')
            })
    })
    it('06 Login - POST Request', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/login',
            headers: {
                'x-api-key': API_KEY
            },
            body: {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka'
            }
        })
            .then((response) => {      
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('token')
            })
    })
    it('07 Login Unsuccessful - POST Request', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/login',
            headers: {
                'x-api-key': API_KEY
            },
            body: { 
                email: 'peter@klaven'
            },
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body).to.have.property('error', 'Missing password')
            })      
    })
});
describe('Scenario: API Testing with ReqRes PUT', () => {
    it('08 Update User - PUT Request', () => {
        const updateData = {
               name: 'Dhea Karina',
                job: 'Software Developer'
            };
        cy.request({
            method: 'PUT',
            url: 'https://reqres.in/api/users/2',
            headers: {
                'x-api-key': API_KEY
            },
            body: updateData
        })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('name',updateData.name)
                expect(response.body).to.have.property('job',updateData.job)
                expect(response.body).to.have.property('updatedAt')
            })
    })
});
describe('Scenario: API Testing with ReqRes PATCH', () => {
    it('09 Update User - PATCH Request', () => {
        const patchData = {
               name: 'Dhea Karina',
                job: 'Software Developer'
            };
        cy.request({
            method: 'PATCH',
            url: 'https://reqres.in/api/users/2',
            headers: {
                'x-api-key':API_KEY
            },
            body: patchData
        })      
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('name',patchData.name)
                expect(response.body).to.have.property('job',patchData.job)
                expect(response.body).to.have.property('updatedAt')
            })
    })
});
describe('Scenario: API Testing with ReqRes DELETE', () => {
    it('10 Delete User - DELETE Request', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://reqres.in/api/users/2',
            headers: {
                'x-api-key': API_KEY
            }
        })
            .then((response) => {
                expect(response.status).to.eq(204)
            })
    })
});


