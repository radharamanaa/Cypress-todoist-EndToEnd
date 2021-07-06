/// <reference types="cypress" />

context('Label Operations', () => {
    describe('Label Operations', () => {
        let auth = {
            'bearer': '5db33544a0b5c9ad53aa61d185670ed79ed24467'
        }
        let jsonContentHeader:Object = {
            'Content-Type': 'application/json',
        }
        let addedLabelId:Number;
        it.only('Create label',() => {
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

        it('Edit label', () => {
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

        it('Delete Label', () => {
            cy.request({
                url: `https://api.todoist.com/rest/v1/labels/${addedLabelId}`,
                auth:auth,
                method: 'DELETE',
            }).then((response) => {
                expect(response.status).to.eq(204);
            })
        })
    })
    
})