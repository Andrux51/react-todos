var TodoApp = window.TodoApp = React.createClass({
  getInitialState: function() {
    return { todos: [] };
  },

  addTodo: function() {
    var currentTodos = this.state.todos;
    currentTodos.push({
      description: this.refs.addTodoInput.value,
    });
    this.refs.addTodoInput.value = '';
    this.setState({ todos: currentTodos });
  },

  completeTodo: function(index) {
    this.updateTodo(index, 'isComplete', true);
  },

  saveEdit: function(index, description) {
    this.updateTodo(index, 'description', description);
    this.toggleEditingTodo(index, false);
  },

  toggleEditingTodo: function(index, isEditing) {
    this.updateTodo(index, 'isEditing', isEditing);
  },

  toggleHideTodos: function() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  },

  updateTodo: function(index, key, val) {
    const todos = this.state.todos;
    const selected = todos[index];

    selected[key] = val;
    todos.splice(index, 1, selected)

    this.setState({ todos });
  },

  render: function() {
    return (
      <div className="todo-container">
        <h2>
          You have {this.state.todos.length} items on the agenda.
          &nbsp;{this.state.todos.length > 4 && <span className="very-normal">{somethingNormal}</span>}
        </h2>

        <a href="#" onClick={this.toggleHideTodos}>{this.state.isHidden ? 'show completed' : 'hide completed'}</a>

        <ul className="todos">
          {this.state.todos.map(function(todo, i) {
            const editRef = `editTodo-${i}`
            return ((!todo.isComplete || !this.state.isHidden) &&
              <li
                key={i}
                className={todo.isComplete ? 'done' : ''}
                onDoubleClick={() => this.completeTodo(i)}
              >
                {todo.isEditing
                  ? <span>
                      <input type="text" ref={editRef} defaultValue={todo.description} />
                      <button onClick={() => this.saveEdit(i, this.refs[editRef].value)}>save</button>
                    </span>
                  : <span>
                      <button onClick={() => this.toggleEditingTodo(i, true)}>edit</button>
                      {todo.description}
                    </span>
                }
              </li>
            )
          }, this)}
        </ul>

        <div className="add">
          <input type="text" ref="addTodoInput" />
          <button onClick={this.addTodo}>Add</button>
        </div>
      </div>
    );
  }
});






















































const somethingNormal = 'THAT IS WAY TOO MANY!!!'
