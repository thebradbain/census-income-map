Vue.component('modal-alert', {
  data: function() {
    return {
      partial: {
        type: String
      },
      isActive: {
        type: Boolean,
        default: false
      }
    };
  },
  template:
  `<div :class="{modal: true, 'is-active': isActive}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <section class="modal-card-body modal-card-body-simple" v-html="content">
      </section>
    </div>
    <button class="modal-close" @click="close"></button>
  </div>`,
  computed: {
    content: function() {
      const templateRoot = "assets/templates";
      let partial = window.JST[`${templateRoot}/${this.partial}.html`];

      if(partial) {
        let content = partial();
        return content;
      }
      return null;
    }
  },
  methods: {
    close: function(e) {
      this.isActive = false;
    }
  },
  mounted: function() {
    this.isActive = false;
    eventBus.$on('show-modal', (partial) => {
      this.partial = partial;
      this.isActive = true;
    });
  }
});
