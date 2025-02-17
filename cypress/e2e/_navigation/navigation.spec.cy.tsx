describe('NavBar component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })
  it('should be visible', () => {
    cy.get('nav')
      .should('be.visible')
  })
  it('should an a profile image of Alex', () => {
    cy.get('img[data-cy="profile-image"]')
      .should('be.visible')
      .should('have.attr', 'src')
  })
  it('should navigate to homepage when clicking on nav logo', () => {
    cy.get('a[data-cy="nav-logo"]')
      .should('have.attr', 'href', '/')
      .click()
      cy.location('pathname').should('eq', '/')
  })
})