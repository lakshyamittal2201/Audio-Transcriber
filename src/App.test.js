// Importing necessary functions from testing-library to render the component and query elements
import { render, screen } from '@testing-library/react';
import App from './App'; // Importing the App component that we are going to test

// Test suite for rendering the 'Audio Transcriber' header
test('renders Audio Transcriber header', () => {
  // Render the App component
  render(<App />);

  // Get all elements that match the role 'heading' and contain the text 'Audio Transcriber'
  const headerElements = screen.getAllByRole('heading', { name: /audio transcriber/i });

  // Assert that at least one of the heading elements is in the document
  // We check the first element in the array because there could be multiple headers
  expect(headerElements[0]).toBeInTheDocument();
});
