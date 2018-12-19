import React, {Component} from 'react'
import 'antd/dist/antd.css'
import store from './store';
import {getAddItemAction, getDeleteItemAction, getInputChangeAction,initListAction} from './store/actionCreators'
import TodoListUI from "./store/TodoListUI";
import axios from 'axios';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handelStoreChange = this.handelStoreChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleItemDelete=this.handleItemDelete.bind(this);
    store.subscribe(this.handelStoreChange)
  }

  render() {
    return (
      <TodoListUI inputValue={this.state.inputValue}
                  handleInputChange={this.handleInputChange}
                  handleBtnClick={this.handleBtnClick}
                  list={this.state.list}
                  handleItemDelete={this.handleItemDelete}
      />
    )
  }

  componentDidMount(){
    axios.get('/list.json').then((res)=>{
      const data = res.data;
      const action = initListAction(data);
      store.dispatch(action);
    })
  }

  handleBtnClick() {
    const action = getAddItemAction();
    store.dispatch(action);
  }

  handelStoreChange() {
    this.setState(store.getState());
  }

  handleInputChange(e) {
    const action = getInputChangeAction(e.target.value);
    store.dispatch(action)
  }

  handleItemDelete(index) {
    const action = getDeleteItemAction(index);
    store.dispatch(action)
  }
}

export default TodoList;