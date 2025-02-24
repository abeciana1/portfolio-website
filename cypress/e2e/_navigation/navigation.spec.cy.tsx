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
  it('should have a link to the about page', () => {
    cy.get('a[href="/about"]')
      .should('exist')
      .should('have.text', 'About')
      .click()
      cy.location('pathname').should('eq', '/about')
  })
  it('should have a link to the blog index page', () => {
    cy.get('a[href="/blog"]')
      .should('exist')
      .should('have.text', 'Blog')
      .click()
      cy.location('pathname').should('eq', '/blog')
  })
  it('should have a link to the contact page', () => {
    cy.get('a[href="/contact"]')
      .should('exist')
      .should('have.text', 'Contact')
      .click()
      cy.location('pathname').should('eq', '/contact')
  })
})