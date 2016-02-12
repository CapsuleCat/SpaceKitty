## Stores

You can create stores using `kitty stores:make MyStore --with="MyActions1, MyActions2"`. This will create `client/stores/my-store.js` with the following content:

```jsx
import Reflux from 'reflux';

import { default as MyActions1 } from '../actions/my-actions-1';
import { default as MyActions2 } from '../actions/my-actions-2';

/**
 * MyStore
 */
const MyStore = Reflux.createStore({
  listenables: [MyActions1, MyActions2],
  init() {
    //
  },
  getInitialState() {
    return {
      //
    };
  }
});

export default { MyStore };

```
