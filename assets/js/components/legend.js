Vue.component('income-legend', {
  template: `
    <div id='legend'>
      <h4>Median Household Income</h4>
      <div id="spectrum"></div>
      <div class='income-level'>
        <span id='k25'>25k&lt;</span>
        <span id='k250'>&gt;250k</span>
      </div>
    </div>`,
});
