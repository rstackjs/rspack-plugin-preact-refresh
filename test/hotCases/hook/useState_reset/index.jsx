import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';

const container = document.createElement('div');
container.id = 'root';
document.body.appendChild(container);
const root = ReactDOM.createRoot(container);
root.render(
  <div>
    <App />
  </div>,
);

it('should keep state', async () => {
  expect(container.querySelector('span').textContent).toBe('before: light');
  
  await new Promise((resolve) => setTimeout(resolve, 200));

  expect(container.querySelector('span').textContent).toBe('before: dark');

  await NEXT_HMR();

  expect(container.querySelector('span').textContent).toBe('after: light');
});

if (module.hot) {
  module.hot.accept('./app');
}
