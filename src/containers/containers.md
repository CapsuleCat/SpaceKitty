## Containers

You can create containers using `kitty containers:make MyContainer --with="MyStore1, MyStore2"`. This will create `client/containers/my-container.js` with the following content:

```jsx
import React from 'react';
import Reflux from 'reflux';

import { default as MyStore1 } from '../stores/my-store-1';
import { default as MyStore2 } from '../stores/my-store-2';

/**
 * MyContainer
 */
export default React.createClass({
  mixins: [
    Reflux.connect(MyStore1, 'MyStore1'),
    Reflux.connect(MyStore2, 'MyStore2')
  ],

  render() {
    return (
      <div>
        MyContainer
      </div>
    );
  }
});

```
