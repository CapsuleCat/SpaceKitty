## Actions

You can create actions using `kitty actions:make MyActionName`. This will create a file at `client/actions/my-action-name.js`:

```js
import Reflux from 'reflux';
/**
 * MyActionName
 */
const MyActionName = Reflux.createActions([
  //
]);
export default { MyActionName };
```
