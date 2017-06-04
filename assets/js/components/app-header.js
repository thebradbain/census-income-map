Vue.component('app-header', {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      isActive: {
        type: Boolean,
        default: false
      }
    };
  },
  template: `
  <header class="nav">
      <div class="nav-left">
        <h1 class="nav-item">
          {{title}}
        </h1>
      </div>
      <span :class="{'nav-toggle': true, 'is-active': isActive}"
            @click="toggleActive">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div :class="{'nav-right': true, 'nav-menu': true, 'is-active': isActive}"
           @click.prevent="click">
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
    toggleActive: function(e) {
      this.isActive = !this.isActive;
    }
  },
  mounted: function() {
    this.isActive = false;
  }
});
