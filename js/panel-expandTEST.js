    function panelExpand() {
      const buttons = document.querySelectorAll('.panel-title button');
      
      buttons.forEach(button => {
        button.addEventListener('click', function() {
          // Toggle current button state
          const targetId = this.getAttribute('data-target');
          const targetPanel = document.querySelector(targetId);
          
          if (this.classList.contains('collapsed')) {
            // Expand this button's panel
            this.classList.remove('collapsed');
            this.classList.add('expanded');
            targetPanel.classList.add('show');
            this.setAttribute('aria-expanded', 'true');
          } else {
            // Collapse this button's panel
            this.classList.remove('expanded');
            this.classList.add('collapsed');
            targetPanel.classList.remove('show');
            this.setAttribute('aria-expanded', 'false');
          }
        });
      })
    };


    document.addEventListener('DOMContentLoaded', function() {
      const icon = document.getElementById('icon');
      
      // Function to toggle the icon class
      function toggleIconClass() {
        if (icon.classList.contains('fa-far')) {
          icon.classList.remove('fa-far');
          icon.classList.add('fa-fas');
        } else {
          icon.classList.remove('fa-fas');
          icon.classList.add('fa-far');
        }
      }

      // Example usage: Toggle the icon class on button click
      document.getElementById('toggleIconButton').addEventListener('click', toggleIconClass);
    });






import _extends from "@babel/runtime-corejs2/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime-corejs2/helpers/esm/inheritsLoose";
import PropTypes from 'prop-types';
import React from 'react';
import { prefix, splitBsProps, bsClass } from './utils/bootstrapUtils';
import Collapse from './Collapse';
var propTypes = {
  /**
   * Callback fired before the component expands
   */
  onEnter: PropTypes.func,

  /**
   * Callback fired after the component starts to expand
   */
  onEntering: PropTypes.func,

  /**
   * Callback fired after the component has expanded
   */
  onEntered: PropTypes.func,

  /**
   * Callback fired before the component collapses
   */
  onExit: PropTypes.func,

  /**
   * Callback fired after the component starts to collapse
   */
  onExiting: PropTypes.func,

  /**
   * Callback fired after the component has collapsed
   */
  onExited: PropTypes.func
};
var contextTypes = {
  $bs_panel: PropTypes.shape({
    headingId: PropTypes.string,
    bodyId: PropTypes.string,
    bsClass: PropTypes.string,
    expanded: PropTypes.bool
  })
};

var PanelCollapse =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(PanelCollapse, _React$Component);

  function PanelCollapse() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = PanelCollapse.prototype;

  _proto.render = function render() {
    var children = this.props.children;

    var _ref = this.context.$bs_panel || {},
        headingId = _ref.headingId,
        bodyId = _ref.bodyId,
        _bsClass = _ref.bsClass,
        expanded = _ref.expanded;

    var _splitBsProps = splitBsProps(this.props),
        bsProps = _splitBsProps[0],
        props = _splitBsProps[1];

    bsProps.bsClass = _bsClass || bsProps.bsClass;

    if (headingId && bodyId) {
      props.id = bodyId;
      props.role = props.role || 'tabpanel';
      props['aria-labelledby'] = headingId;
    }

    return React.createElement(Collapse, _extends({
      in: expanded
    }, props), React.createElement("div", {
      className: prefix(bsProps, 'collapse')
    }, children));
  };

  return PanelCollapse;
}(React.Component);

PanelCollapse.propTypes = propTypes;
PanelCollapse.contextTypes = contextTypes;
export default bsClass('panel', PanelCollapse);





import _objectWithoutPropertiesLoose from "@babel/runtime-corejs2/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime-corejs2/helpers/esm/inheritsLoose";
import _assertThisInitialized from "@babel/runtime-corejs2/helpers/esm/assertThisInitialized";
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import elementType from 'react-prop-types/lib/elementType';
import SafeAnchor from './SafeAnchor';
import createChainedFunction from './utils/createChainedFunction';
var propTypes = {
  /**
   * only here to satisfy linting, just the html onClick handler.
   *
   * @private
   */
  onClick: PropTypes.func,

  /**
   * You can use a custom element for this component
   */
  componentClass: elementType
};
var defaultProps = {
  componentClass: SafeAnchor
};
var contextTypes = {
  $bs_panel: PropTypes.shape({
    bodyId: PropTypes.string,
    onToggle: PropTypes.func,
    expanded: PropTypes.bool
  })
};

var PanelToggle =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(PanelToggle, _React$Component);

  function PanelToggle() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = PanelToggle.prototype;

  _proto.handleToggle = function handleToggle(event) {
    var _ref = this.context.$bs_panel || {},
        onToggle = _ref.onToggle;

    if (onToggle) {
      onToggle(event);
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        onClick = _this$props.onClick,
        className = _this$props.className,
        componentClass = _this$props.componentClass,
        props = _objectWithoutPropertiesLoose(_this$props, ["onClick", "className", "componentClass"]);

    var _ref2 = this.context.$bs_panel || {},
        expanded = _ref2.expanded,
        bodyId = _ref2.bodyId;

    var Component = componentClass;
    props.onClick = createChainedFunction(onClick, this.handleToggle);
    props['aria-expanded'] = expanded;
    props.className = classNames(className, !expanded && 'collapsed');

    if (bodyId) {
      props['aria-controls'] = bodyId;
    }

    return React.createElement(Component, props);
  };

  return PanelToggle;
}(React.Component);

PanelToggle.propTypes = propTypes;
PanelToggle.defaultProps = defaultProps;
PanelToggle.contextTypes = contextTypes;
export default PanelToggle;