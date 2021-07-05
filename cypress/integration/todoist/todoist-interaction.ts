/// <reference types="cypress" />

context('Todoist testing', () => {
    describe('Todoist Basic Interactions', () => {
        let projectId:number = 65651217861;
        let taskAddedId:Number;
        let auth = {
            'bearer': '5db33544a0b5c9ad53aa61d185670ed79ed24467'
        }
        let addedLabelId:Number;
        function getRandomNumber(minimum:number = 1, maximum:number = 100):number {
            if (minimum > maximum) {
              console.log('Minimum cannot be more than maximum. Check your inputs');
              return -1;
            }
            if (minimum === maximum) {
              return minimum;
            }
            let temp = Math.random();
            while (!(Math.floor(temp) > minimum && Math.floor(temp) < maximum)) {
              temp = Math.floor(Math.random() * (maximum - 1));
            }
            return temp;
          }
        function getRandString():String {
            const allChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefigklmnopqrstuvwxyz0123456789';
            const len = 10;
            let result = '';
            for (let index = 0; index < len; index++) {
                result += allChars.charAt(getRandomNumber(0, allChars.length - 1));
            }
            return result;
        }
        it('Get Users Projects',() => {
            cy.request({
                log: true,
                url: 'https://api.todoist.com/rest/v1/projects',
                method: 'GET',
                auth:auth,
            }).as('todoistReqeust');
            cy.get('@todoistReqeust').should((response) => {
                console.log(response);
                expect(response.body[0]).to.have.property('name');
            })
        })
        
        it('Add a project', () => {
            cy.request({
                url: 'https://api.todoist.com/rest/v1/projects',
                method: 'POST',
                auth:auth,
                headers: {
                    'Content-Type': 'application/json',
                },
                body:{
                    id: projectId,
                    name:'Shopping List',
                    'comment_count': 0,
                    'color': 47,
                    'shared': false,
                    'sync_id': 0,
                    'order': 1,
                    'favorite': false,
                    'url': `https://todoist.com/showProject?id=${projectId}`
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Add a task',() => {
            cy.request({
                url: 'https://api.todoist.com/rest/v1/tasks',
                auth: auth,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    content: 'Buy Potatoes',
                    project_id: projectId,
                    description: 'Potatoes are very good for health'
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('id');
                taskAddedId = response.body.id;
            })
        })
        it('Edit task - Add new Desc',() => {
            let newDesc:String = 'This is a new Description';
            cy.request({
                url: `https://api.todoist.com/rest/v1/tasks/${taskAddedId}`,
                auth:auth,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    description: newDesc,
                }
            }).then((response) => {
                expect(response.status).to.eq(204);
            })
        })

        it('Changing due date to tomorrow', () => {
            cy.request({
                url: `https://api.todoist.com/rest/v1/tasks/${taskAddedId}`,
                auth:auth,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    due_string:'tomorrow',
                }
            }).then((response) => {
                expect(response.status).to.eq(204);
            })
        })

        it('Close task', () => {
            cy.request({
                url: `https://api.todoist.com/rest/v1/tasks/${taskAddedId}/close`,
                method: 'POST',
                auth:auth,
            }).then((response) => {
                expect(response.status).to.eq(204);
            })
        })

        it('ReOpen a task', () => {
            cy.request({
                url: `https://api.todoist.com/rest/v1/tasks/${taskAddedId}/reopen`,
                method: 'POST',
                auth:auth,
            }).then((response) => {
                expect(response.status).to.eq(204);
            })
        })

        it('Delete a task', () => {
            cy.request({
                url: `https://api.todoist.com/rest/v1/tasks/${taskAddedId}`,
                auth:auth,
                method: 'DELETE',
            }).then((response) => {
                expect(response.status).to.eq(204);
            })

        })

        it('Delete a project', () => {
            cy.request({
                url: `https://api.todoist.com/rest/v1/projects/${projectId}`,
                method: 'DELETE',
                auth: auth,
            }).then((response) => {
                expect(response.status).to.eq(204);
            })
        })
        
    })
})