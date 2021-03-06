import Ember from 'ember';
import layout from '../templates/data-table';

export default Ember.Component.extend({
  layout,
  tagName:'table',

  showHeader:true,
  showFooter:false,

  singleSelection:Ember.computed.equal('selectionMode','single'),

  notSelectedRows:Ember.computed.setDiff('data','selectedRows'),
  isAllSelected: Ember.computed('notSelectedRows',function(){
    let ns = this.get('notSelectedRows');
    let data = this.get('data');
    return (data.length !== 0 ) && (ns.length === 0);
  }),

  selectionChanged:Ember.K,
  classNames:['contextual-data-table'],

  selectedRows: Ember.A([]),

  dataChanged: Ember.observer('data.[]', function(){
    this.set('selectedRows', Ember.A([]));
    this.get('selectionChanged')(this.get('selectedRows'));
  }),

  actions:{
    selected:function(row){
      if(this.get('selectionMode')==='single'){
        this.get('selectedRows').clear();
      }
      this.get('selectedRows').pushObject(row);
      this.get('selectionChanged')(this.get('selectedRows'));
    },
    deselected:function(row){
      this.get('selectedRows').removeObject(row);
      this.get('selectionChanged')(this.get('selectedRows'));
    },
    selectAll:function(){
      if(this.get('selectionMode')==='single'){
        return false;
      }
      this.set('selectedRows',this.get('data'));
      this.get('selectionChanged')(this.get('selectedRows'));
    },
    deselectAll:function(){
      this.set('selectedRows', Ember.A([]));
      this.get('selectionChanged')(this.get('selectedRows'));
    }
  }
});
