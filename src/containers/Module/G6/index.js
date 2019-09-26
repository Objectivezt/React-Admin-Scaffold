import React, { Component, Fragment } from 'react';
import G6 from '@antv/g6';

const data = {
  id: 'Modeling Methods',
  children: [
    {
      id: 'Classification',
      children: [
        { id: 'Logistic regression' },
        { id: 'Linear discriminant analysis' },
        { id: 'Rules' },
        { id: 'Decision trees' },
        { id: 'Naive Bayes' },
        { id: 'K nearest neighbor' },
        { id: 'Probabilistic neural network' },
        { id: 'Support vector machine' }
      ]
    },
    {
      id: 'Classification',
      children: [
        { id: 'Logistic regression' },
        { id: 'Linear discriminant analysis' },
        { id: 'Rules' },
        { id: 'Decision trees' },
        { id: 'Naive Bayes' },
        { id: 'K nearest neighbor' },
        { id: 'Probabilistic neural network' },
        { id: 'Support vector machine' }
      ]
    },
    {
      id: 'Consensus',
      children: [
        {
          id: 'Models diversity',
          children: [
            { id: 'Different initializations' },
            { id: 'Different parameter choices' },
            { id: 'Different architectures' },
            { id: 'Different modeling methods' },
            { id: 'Different training sets' },
            { id: 'Different feature sets' }
          ]
        },
        {
          id: 'Methods',
          children: [{ id: 'Classifier selection' }, { id: 'Classifier fusion' }]
        },
        {
          id: 'Common',
          children: [{ id: 'Bagging' }, { id: 'Boosting' }, { id: 'AdaBoost' }]
        }
      ]
    },
    {
      id: 'Regression',
      children: [
        { id: 'Multiple linear regression' },
        { id: 'Partial least squares' },
        { id: 'Multi-layer feedforward neural network' },
        { id: 'General regression neural network' },
        { id: 'Support vector regression' }
      ]
    }
  ]
};

export default class componentName extends Component {
  componentDidMount() {
    const graph = new G6.TreeGraph({
      container: 'mountNode',
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: 2,
      modes: {
        default: [
          {
            type: 'collapse-expand',
            onChange: function onChange(item, collapsed) {
              const tempData = item.get('model').data;
              tempData.collapsed = collapsed;
              return true;
            }
          },
          'drag-canvas',
          'zoom-canvas'
        ]
      },
      defaultNode: {
        size: 16,
        anchorPoints: [[0, 0.5], [1, 0.5]]
      },
      defaultEdge: {
        shape: 'cubic-horizontal'
      },
      nodeStyle: {
        default: {
          fill: '#40a9ff',
          stroke: '#096dd9'
        }
      },
      edgeStyle: {
        default: {
          stroke: '#A3B1BF'
        }
      },
      layout: {
        type: 'mindmap',
        direction: 'H',
        getHeight: function getHeight() {
          return 16;
        },
        getWidth: function getWidth() {
          return 16;
        },
        getVGap: function getVGap() {
          return 10;
        },
        getHGap: function getHGap() {
          return 100;
        }
      }
    });

    let centerX = 0;
    graph.node(node => {
      if (node.id === 'Modeling Methods') {
        centerX = node.x;
      }

      let position;
      if (node.children && node.children.length > 0) {
        position = 0;
      } else {
        position = node.x > centerX ? 'right' : 'left';
      }

      return {
        size: 26,
        style: {
          fill: '#40a9ff',
          stroke: '#096dd9'
        },
        label: node.id,
        labelCfg: {
          position
        }
      };
    });

    graph.data(data);
    graph.render();
    graph.fitView();
  }

  render() {
    return (
      <Fragment>
        <div id="mountNode" />
      </Fragment>
    );
  }
}
