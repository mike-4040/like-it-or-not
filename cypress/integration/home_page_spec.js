describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });

  it('sets auth token when logging in via form submission', function () {
    // destructuring assignment of the this.currentUser object
    const currentUser = {email: "1@1.com", password: "123" }
    const { email, password } = currentUser;

    cy.visit('/signin');

    cy.get('input[name=email]').type(email);

    // {enter} causes the form to submit
    cy.get('input[name=password]').type(`${password}{enter}`);

    // we should be redirected to /dashboard
    cy.url().should('include', '/main');
  
    // cy.expect(localStorage.getItem('id_token')).to.exist;

    // our auth cookie should be present
    // cy.getCookie('your-session-cookie').should('exist');

    // UI should reflect this user being logged in
    // cy.get('h1').should('contain', 'jane.lane');
  });
});
