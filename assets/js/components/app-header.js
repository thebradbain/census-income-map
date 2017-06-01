Vue.component('app-header', {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  template: `
  <header class="nav">
      <div class="nav-left">
        <h1 class="nav-item">
          {{title}}
        </h1>
      </div>
      <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div class="nav-right nav-menu" @click.prevent="click">
        <slot></slot>
      </div>
  </header>`,
  methods: {
    click: function(e) {
      const templateRoot = "assets/templates";
      let target = e.target;
      let partialName = target.getAttribute('partial');

      eventBus.$emit('show-modal', partialName);
    },
    donate: function(e) {
      alert(e);
    }
  },
});
