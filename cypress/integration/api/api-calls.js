describe('API Tests', () => {
  it('should create an object via POST', () => {
    const requestBody = {
      name: "Apple MacBook Pro 16",
      data: {
        year: 2019,
        price: 1849.99,
        "CPU model": "Intel Core i9",
        "Hard disk size": "1 TB"
      }
    };

    cy.request('POST', 'https://api.restful-api.dev/objects', requestBody)
      .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq(requestBody.name);
        expect(response.body.data.year).to.eq(requestBody.data.year);
        expect(response.body.data.price).to.eq(requestBody.data.price);
        expect(response.body.data['CPU model']).to.eq(requestBody.data['CPU model']);
        expect(response.body.data['Hard disk size']).to.eq(requestBody.data['Hard disk size']);
      });
  });

  it('should update an object via PUT', () => {
    const postBody = {
      name: "Apple MacBook Pro 16",
      data: {
        year: 2019,
        price: 1849.99,
        "CPU model": "Intel Core i9",
        "Hard disk size": "1 TB"
      }
    };

    cy.request('POST', 'https://api.restful-api.dev/objects', postBody)
      .then((response) => {
        expect(response.status).to.eq(200);
        const newId = response.body.id;

        const putBody = {
          name: "Apple MacBook Pro 16",
          data: {
            year: 2020,
            price: 2049.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "2 TB",
            "color": "space gray"
          }
        };

        cy.request('PUT', `https://api.restful-api.dev/objects/${newId}`, putBody)
          .should((putResponse) => {
            expect(putResponse.status).to.eq(200);
            expect(putResponse.body.name).to.eq(putBody.name);
            expect(putResponse.body.data.year).to.eq(putBody.data.year);
            expect(putResponse.body.data.price).to.eq(putBody.data.price);
            expect(putResponse.body.data['CPU model']).to.eq(putBody.data['CPU model']);
            expect(putResponse.body.data['Hard disk size']).to.eq(putBody.data['Hard disk size']);
            expect(putResponse.body.data.color).to.eq(putBody.data.color);
          });
      });
  });
  it('should patch an object name via PATCH', () => {
    const postBody = {
      name: "Apple MacBook Pro 16",
      data: {
        year: 2019,
        price: 1849.99,
        "CPU model": "Intel Core i9",
        "Hard disk size": "1 TB"
      }
    };

    cy.request('POST', 'https://api.restful-api.dev/objects', postBody)
      .then((response) => {
        expect(response.status).to.eq(200);
        const newId = response.body.id;

        const patchBody = {
          name: "Apple MacBook Pro 16 (Updated Name)"
        };

        cy.request('PATCH', `https://api.restful-api.dev/objects/${newId}`, patchBody)
          .should((patchResponse) => {
            expect(patchResponse.status).to.eq(200);
            expect(patchResponse.body.name).to.eq(patchBody.name);
          });
      });
  });
});