Vue.component('horizontal-panel', {
  template: `
  <nav class="level">
    <!-- Left side -->
    <div class="level-left">
      <slot name="left"></slot>
    </div>

    <!-- Right side -->
    <div class="level-right">
      <slot name="right"></slot>
    </div>
  </nav>`,
});
