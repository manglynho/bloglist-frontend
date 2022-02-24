describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Lorenzo',
      username: 'lorenzo',
      password: '86122614604'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login').click()
    cy.contains('Username')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('lorenzo')
      cy.get('#password').type('86122614604')
      cy.get('#login-button').click()
      cy.contains('Lorenzo logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('lorenzo')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Lorenzo logged in')
    })
  })

  //describe.only('When logged in', function() {
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'lorenzo', password: '86122614604' })
    })

    it('A blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('A New Blog')
      cy.get('#author').type('Lorenzo')
      cy.get('#url').type('newblogurl.com')
      cy.get('#add-blog-button').click()
      cy.contains('A New Blog Lorenzo')
    })

    describe('add a blog and...', function () {
      beforeEach(function () {
        cy.createBlog({
          'title': 'A New Blog',
          'author': 'Lorenzo',
          'url': 'newblogurl.com',
          'likes': 0
        })
      })

      it('can be liked', function () {
        cy.contains('A New Blog Lorenzo').parent().as('MyContainer')
        cy.get('@MyContainer').contains('View').click()
        cy.get('@MyContainer').find('.likeBtn').click()
        cy.get('@MyContainer').find('.likesValue').should('contain', '1')
      })

      it('can be removed', function () {
        cy.contains('A New Blog Lorenzo').parent().as('MyContainer')
        cy.get('@MyContainer').contains('View').click()
        cy.get('@MyContainer').find('.removeBtn').click()
        cy.get('html').should('not.contain', 'A New Blog Lorenzo')
      })

      it('others cant erase my blog', function () {
        cy.get('#logout-btn').click()
        const user2 = {
          name: 'Pepe',
          username: 'pepe',
          password: '123456789'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user2)
        cy.login({ username: 'pepe', password: '123456789' })
        cy.contains('A New Blog Lorenzo').parent().as('MyContainer')
        cy.get('@MyContainer').contains('View').click()
        cy.get('@MyContainer').find('.removeBtn').click()
        cy.get('.error').should('contain', 'Blogs can only be deleted by his creator')
          .and('have.css', 'color', 'rgb(255, 0, 0)')
      })

    })

    describe('let place some blogs and...', function () {
      beforeEach(function () {
        cy.createBlog({
          'title': 'Blog 2',
          'author': 'Lorenzo',
          'url': 'newblogurl2.com',
          'likes': 11
        })
        cy.createBlog({
          'title': 'Blog 3',
          'author': 'Lorenzo',
          'url': 'newblogurl3.com',
          'likes': 10
        })
        cy.createBlog({
          'title': 'Blog 1',
          'author': 'Lorenzo',
          'url': 'newblogurl1.com',
          'likes': 15
        })
      })

      it('they are ordered by likes', function () {
        cy.get('.blog_element').then((items) => {
          cy.get(items).eq(0).contains('View').click()
          cy.get(items).eq(0).find('.likesValue').should('contain', '15')
          cy.get(items).eq(1).contains('View').click()
          cy.get(items).eq(1).find('.likesValue').should('contain', '11')
          cy.get(items).eq(2).contains('View').click()
          cy.get(items).eq(2).find('.likesValue').should('contain', '10')
        })

      })



    })

  })



})