import React, {Component} from 'react'
import 'antd/dist/antd.css'
import {Input, Button, List} from 'antd';
import store from './store';


class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handelStoreChange = this.handelStoreChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    store.subscribe(this.handelStoreChange)
  }

  render() {
    return (
      <div style={{margin: '10px', marginLeft: '10'}}>
        <Input
          value={this.state.inputValue}
          placeholder='todo info'
          style={{width: '300px', marginRight: '10px'}}
          onChange={this.handleInputChange}
        />
        <Button type="primary" onClick={this.handleBtnClick}>提交</Button>

        <List
          style={{marginTop: '10px', width: '300px'}}
          bordered
          dataSource={this.state.list}
          renderItem={(item, index) => (
            <List.Item onClick={this.handleItemDelete.bind(this, index)}>{item}</List.Item>)}
        />
      </div>
    )
  }

  handleBtnClick() {
    const action = {
      type: 'add_todo_item'
    }
    store.dispatch(action);
  }

  handelStoreChange() {
    this.setState(store.getState());
  }

  handleInputChange(e) {
    const action = {
      type: 'change_input_value',
      value: e.target.value
    }
    store.dispatch(action)
  }

  handleItemDelete(index){
    const  action ={
      type: 'delete_todo_item',
      index
    }
    store.dispatch(action)
  }
}

export default TodoList;