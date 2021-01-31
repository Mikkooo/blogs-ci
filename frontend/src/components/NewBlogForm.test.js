import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import NewBlogForm from './NewBlogForm';

describe('<NewBlogForm />', () => {
  const testBlog = { title: 'mikon blogi', author: 'mikko', url: 'www.blogi.fi' };
  let component;
  const mockPostBlogs = jest.fn();
  const mockSetBlogs = jest.fn();

  beforeEach(() => {
    mockPostBlogs.mockClear();
    mockSetBlogs.mockClear();
    component = render(
      <NewBlogForm
        blogs={[]}
        setBlogs={mockSetBlogs}
        postBlog={mockPostBlogs}
      />,
    );
  });

  test('Should call post with the correct arguments', () => {
    const titleInput = component.container.querySelector('.titleInput');
    fireEvent.change(titleInput, {
      target: { value: testBlog.title },
    });
    const authorInput = component.container.querySelector('.authorInput');
    fireEvent.change(authorInput, {
      target: { value: testBlog.author },
    });
    const urlInput = component.container.querySelector('.urlInput');
    fireEvent.change(urlInput, {
      target: { value: testBlog.url },
    });
    const submitButton = component.container.querySelector('.submitBlogButton');

    mockPostBlogs.mockReturnValueOnce(Promise.resolve());
    fireEvent.click(submitButton);

    expect(mockPostBlogs).toHaveBeenCalledWith(testBlog);
  });
});
