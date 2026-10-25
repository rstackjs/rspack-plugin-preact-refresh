import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';

const container = document.createElement('div');
container.id = 'root';
document.body.appendChild(container);
const root = ReactDOM.createRoot(container);
root.render(<App />);

it('should refresh components declared during render', async () => {
  expect(container.querySelector('span').textContent).toBe('content 1');

  await NEXT_HMR();
  expect(container.querySelector('span').textContent).toBe('content 2');

  await NEXT_HMR();
  expect(container.querySelector('span').textContent).toBe('content 3');
});

if (module.hot) {
  module.hot.accept('./app');
}
