Hello = React.createClass({
  mixins: [ReactMeteorData, ReactBEM],
  getMeteorData() {
    return {};
  },
  getInitialState() {
    return {};
  },
  getDefaultProps() {
    return {};
  },
  componentDidMount() {
    //
  },
  bem_blocks: ['hello'],
  bem_render() {
    return (
      <div bem_element="">
        <h1 role="header" modifiers="major">Meow</h1>
        <div role="row">
          <h5 role="header" modifiers="secondary">Stop worrying about your project structure and get hacking</h5>
        </div>
        <div role="row">
          <iframe src="//giphy.com/embed/JIX9t2j0ZTN9S" width="480" height="480" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="http://giphy.com/gifs/JIX9t2j0ZTN9S">via GIPHY</a></p>
        </div>
        <div role="row">
          <p>Space Kitty utilizes the following principles:</p>
          <ul>
            <li>Views are modules consisting of a React Component and a SCSS file.</li>
            <li>BEM — Block Element Modifier — is how to organize your SCSS.</li>
            <li>BEM selectors are automatically generated, just write modifiers and roles instead.</li>
            <li>Commands should be used to organize code so that it is reusable and dispatchable.</li>
          </ul>
        </div>
      </div>
    );
  }
});