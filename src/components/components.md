## Components

You can create components using `kitty component:make MyComponent` and `kitty component:make MyModule MyComponent`.

The command `kitty component:make MyComponent` will create the following files:

* `client/components/my-component/my-component.jsx`
* `client/components/my-component/_my-component.scss`
* `client/components/my-component/tests/my-component.jsx`

With the following contents:

**client/components/my-component/my-component.jsx**

```jsx
import React from 'react';
/**
 * My Component
 */
export default () => (
  <div class="my-component">
    My Component
  </div>
);
```

**client/components/my-component/_my-component.scss**

```scss
.my-component {
  //
}
```

**client/components/my-component/tests/my-component.jsx**

```jsx
const {describe, it} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import MyComponent from '../my-component.jsx';
describe('MyComponent', () => {
  it('should exist', () => {
    const el = shallow(<MyComponent />);
    expect(el.find('.my-component').length).to.be.equal(1);
  });
});
```

Similarly, the command `kitty component:make MyNamespace MyComponent` will create the following files:

* `client/components/my-namespace/my-component/my-component.jsx`
* `client/components/my-namespace/my-component/_my-component.scss`
* `client/components/my-namespace/my-component/tests/my-component.jsx`
