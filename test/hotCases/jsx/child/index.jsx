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

it('should rerender when children change', async () => {
  expect(container.querySelector('span').textContent).toBe('no child');

  await NEXT_HMR();
  expect(container.querySelector('span').textContent).toBe('has child');

  await NEXT_HMR();
  expect(container.querySelector('span').textContent).toBe('child change');
});

if (module.hot) {
  module.hot.accept('./app');
}
