import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;
  const mockLikeHandler = jest.fn();
  const testUser = { name: 'Mikko Pirhonen', username: 'mikkopi' };
  const testBlog = {
    title: 'mikon blogi', author: 'mikko', url: 'www.blogi.fi', likes: '123', user: testUser,
  };

  beforeEach(() => {
    mockLikeHandler.mockClear();
    component = render(
      <Blog
        blog={testBlog}
        addLikeToBlog={mockLikeHandler}
        user={testUser}
      />,
    );
  });

  test('Should render title and author when not expanded', () => {
    expect(component.container).toHaveTextContent(testBlog.title);
    expect(component.container).toHaveTextContent(testBlog.author);
  });
  test('but not url or likes', () => {
    expect(component.container).not.toHaveTextContent(testBlog.url);
    expect(component.container).not.toHaveTextContent(testBlog.likes);
  });
  test('Should render url and likes when expanded', () => {
    const button = component.container.querySelector('.expandButton');
    fireEvent.click(button);

    expect(component.container).toHaveTextContent(testBlog.url);
    expect(component.container).toHaveTextContent(testBlog.likes);
  });
  test('Pressing the like button twice should results in two like events firing', () => {
    const expandButton = component.container.querySelector('.expandButton');
    fireEvent.click(expandButton);

    const button = component.container.querySelector('.likeButton');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockLikeHandler.mock.calls).toHaveLength(2);
  });
});
