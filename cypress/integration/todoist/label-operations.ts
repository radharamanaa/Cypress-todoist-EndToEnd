/// <reference types="cypress" />


describe('Label Operations', () => {
    let auth = {
        'bearer': '676f2c4e5c1eca97a5559e55b8233b37427fc913'
    }
    let jsonContentHeader:Object = {
        'Content-Type': 'application/json',
    }
    let addedLabelId:Number;
    it('Create label C1',() => {
        cy.request({
            url: `https://api.todoist.com/rest/v1/labels`,
            auth:auth,
            method: 'POST',
            headers: jsonContentHeader,
            body:{
                name: "Regular",
            }


            

        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id');
            addedLabelId = response.body.id;
        })
    })

    it('Edit label C2', () => {
        cy.request({
            url: `https://api.todoist.com/rest/v1/labels/${addedLabelId}`,
            auth:auth,
            method: 'POST',
            headers: jsonContentHeader,
            body: {
                name: 'Special',
            }
        }).then((response) => {
            expect((response.status)).to.eq(204);
        })
    })

    it('Delete Label C3', () => {
        cy.request({
            url: `https://api.todoist.com/rest/v1/labels/${addedLabelId}`,
            auth:auth,
            method: 'DELETE',
        }).then((response) => {
            expect(response.status).to.eq(204);
        })
    })
})

