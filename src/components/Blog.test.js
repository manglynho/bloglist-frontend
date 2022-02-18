import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const user ={
      name: 'Reiner',
    }

    const blog = {
      title: 'newBlogTittle',
      author: 'newBlogAuthor',
      url: 'newBlogUrl',
      likes: 9,
      user: user
    }

    component = render(
      <Blog blog={blog}/>
    )
  })

  test('at start moreDataPanel are not displayed', () => {
    const div = component.container.querySelector('.moreDataPanel')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, moreDataPanel are displayed', () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    const div = component.container.querySelector('.moreDataPanel')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking twice the button calls event controller twice', () => {
    const user ={
      name: 'Reiner',
    }

    const blog = {
      title: 'newBlogTittle',
      author: 'newBlogAuthor',
      url: 'newBlogUrl',
      likes: 9,
      user: user
    }
    const mockHandler = jest.fn()

    component = render(
      <Blog blog={blog} plusLike={mockHandler} />
    )
    const button = component.container.querySelector('.likeBtn')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })


})

