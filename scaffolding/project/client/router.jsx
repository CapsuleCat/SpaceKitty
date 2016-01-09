FlowRouter.route('/', {
  action: function() {
    ReactLayout.render(DefaultLayout, {
      content: (<Hello />)
    });
  }
});
