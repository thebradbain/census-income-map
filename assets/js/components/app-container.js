Vue.component('app-container', {
  template: `
  <section id="app-container">
    <!-- Hero header: will stick at the top -->
    <div id="app-header">
      <slot name="header"></slot>
    </div>

    <!-- Hero content: will be in the middle -->
    <div id="app-body">
      <slot name="content"></slot>
    </div>

    <!-- Hero footer: will stick at the bottom -->
    <div id="app-footer">
      <slot name="footer"></slot>
    </div>
  </section>`
});
