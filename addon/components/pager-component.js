import Ember from 'ember';
import layout from '../templates/pager-component';

export default Ember.Component.extend({
  layout,
  classNames:['contextual-pager-component'],


  previousButtonClass: Ember.computed('previousDisabled',function(){
    return (this.get('previousDisabled') ? 'disabled' : '') ;
  }),

  nextButtonClass: Ember.computed('nextDisabled',function(){
    return (this.get('nextDisabled') ? 'disabled' : '') ;
  }),

  previousLabel: '<<',
  nextLabel: '>>',

  actions:{
    previous:function(){
      if (this.get('previousDisabled')) {
        return;
      }

      (this.get('previous')||Ember.K)();
    },
    next:function(){
      if (this.get('nextDisabled')) {
        return;
      }

      (this.get('next')||Ember.K)();
    }
  }
});
