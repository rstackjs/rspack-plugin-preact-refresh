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

new Worker(new URL('./worker.js', import.meta.url));

it('should rerender jsx',  async () => {
  expect(container.querySelector('span').textContent).toBe('content 1');
  await NEXT_HMR();
  expect(container.querySelector('span').textContent).toBe('content 2');
});

if (module.hot) {
  module.hot.accept('./app');
}
