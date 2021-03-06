// -------------------------------------------------------------------------
//  Part of the CodeChecker project, under the Apache License v2.0 with
//  LLVM Exceptions. See LICENSE for license information.
//  SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
// -------------------------------------------------------------------------

define([
  'dojo/dom-construct',
  'dojo/_base/declare',
  'dijit/form/CheckBox',
  'codechecker/filter/FilterBase',
  'codechecker/util'],
function (dom, declare, CheckBox, FilterBase, util) {
  return declare(FilterBase, {
    defaultValue : false,

    postCreate : function () {
      var that = this;
      this._uniqueCheckBox = new CheckBox({
        checked : this.defaultValue,
        onChange : function (isUnique) {
          that.updateReportFilter(isUnique);
          that.parent.notifyAll([that]);
        }
      });
      dom.place(this._uniqueCheckBox.domNode, this.domNode);

      this._uniqueCheckBoxLabel =
        util.createLabelForUniqueCheckbox(this._uniqueCheckBox);
    },

    initByUrl : function (queryParams) {
      var state = queryParams[this.class];
      var isUnique = state === 'on' ? true : false;
      this._uniqueCheckBox.set('checked', isUnique, false);
      this.updateReportFilter(isUnique);
    },

    clear : function () {
      this.updateReportFilter(this.defaultValue);
      this._uniqueCheckBox.set('checked', this.defaultValue, false);
    },

    isUnique : function () {
      return this._uniqueCheckBox.get('checked');
    },

    getUrlState : function () {
      var state = {};
      state[this.class] = this.isUnique() ? 'on' : null;

      return state;
    }
  });
});
