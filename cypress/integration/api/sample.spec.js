describe('Sample API Test', () => {
  it('should fetch a list of posts', () => {
    cy.request('https://jsonplaceholder.typicode.com/posts')
      .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length(100);
        expect(response).to.have.property('headers');
        expect(response).to.have.property('duration');
      });
  });
});