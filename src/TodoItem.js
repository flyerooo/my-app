import React, {Component} from 'react'
import PropTypes from 'prop-types'

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    console.log('child render');
    const {content} = this.props;
    return (
      <div onClick={this.handleClick}>
        {content}
      </div>
    )

  }

  handleClick() {
    const {deleteItem, index} = this.props;
    deleteItem(index);
  }

  // 一个组件要从父组件接收参数
  // 如果这个组件第一次存在于父组件中，不会执行
  // 如果这个组件之前已经存在于父组件中，才会执行
  componentWillReceiveProps(){
    console.log('child componentWillReceiveProps')
  }

  componentWillUnmount(){
    console.log('child componentWillUnmount');
  }
}

TodoItem.propTypes = {
  content: PropTypes.string,
  deleteItem: PropTypes.func,
  index: PropTypes.number,
};

export default TodoItem;