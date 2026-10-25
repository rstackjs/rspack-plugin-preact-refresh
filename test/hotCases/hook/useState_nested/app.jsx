import { useState } from 'preact/hooks';

export function App() {
  const Nested = () => {
    const [text] = useState('content 1');
    return <span>{text}</span>;
  };

  return <Nested />;
}

---
import { useState } from 'preact/hooks';

export function App() {
  const Nested = () => {
    const [text] = useState('content 2');
    return <span>{text}</span>;
  };

  return <Nested />;
}

---
import { useState } from 'preact/hooks';

export function App() {
  const Nested = () => {
    const [text] = useState('content 3');
    return <span>{text}</span>;
  };

  return <Nested />;
}
