describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/test/reset');
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', () => {
    cy.contains('Username');
    cy.contains('Password');
    cy.contains('login');
  });
  describe('Login', () => {
    const user = {
      username: 'mikko',
      password: 'pass',
      name: 'Mikko Pirhonen',
    };
    beforeEach(() => {
      cy.request('POST', 'http://localhost:3001/api/users', user);
    });
    it('should be successful with correct credientials', () => {
      cy.contains('Username').type('mikko');
      cy.contains('Password').type('pass');
      cy.contains('login').click();
      cy.contains('blogs');
      cy.contains('successful login');
    });
    it('should be fail with incorrect credientials', () => {
      cy.get('.username').type('mikko');
      cy.get('.password').type('incorrect');
      cy.contains('login').click();
      cy.contains('unsuccessful login');
    });
    describe('A logged in user', () => {
      beforeEach(() => {
        cy.login({ username: 'mikko', password: 'pass' });
      });
      it('should be able to add a blog', () => {
        cy.contains('create new blog').click();
        cy.contains('title').type('the title');
        cy.contains('author').type('the author');
        cy.contains('url').type('the url');
        cy.contains('Create').click();

        cy.get('.blogList')
          .should('contain', 'the title')
          .and('contain', 'the author');
      });
      describe('A blog', () => {
        beforeEach(() => {
          cy.contains('create new blog').click();
          cy.contains('title').type('the title');
          cy.contains('author').type('the author');
          cy.contains('url').type('the url');
          cy.contains('Create').click();

          cy.get('.blogList').find('.blog').as('blog');
          cy.get('@blog').contains('show').click();
        });
        it('should be likeable', () => {
          cy.get('@blog').get('.likeCount')
            .then(($span) => {
              const oldLikes = parseInt($span.text(), 10);
              cy.get('@blog').get('button.likeButton').click();
              cy.get('@blog').get('button.likeButton').click();
              cy.get('@blog').get('.likeCount')
                .then((span) => {
                  const newLikes = parseInt(span.text(), 10);
                  expect(newLikes).to.eq(oldLikes + 1);
                });
            });
        });
        it('should be removable', () => {
          cy.get('@blog').contains('remove').click();
          cy.on('window:confirm', () => true);
          cy.get('@blog').should('not.exist');
        });
      });
    });
  });
});
