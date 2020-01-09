//TODO: Add filter functionality
//TODO: Restruvture Reat App into smaller components.

const todo = (state, action) => {
    switch (action.type){
        case "ADD_TODO":
            return {
                id: action.id,
                text: action.text,
                completed: false 
            }
        case "TOGAL_TODO":
            if(state.id !==action.id){
                return state
            }else{
                return {
                    ...state,
                    completed: !state.completed
                }
            }
        default:
            return state;
    }
}

const visibilityFilter = (state="SHOW_ALL", action)=>{
    switch (action.type){
        case "SET_VISIBILITY_FILTER":
            return action.visibilityFilter;
        default:
            return state;
    }
}


const todos = (state = [], action) => {
    switch (action.type){
        case "ADD_TODO":
            return [...state,
                todo(undefined, action)
            ]
        case "TOGAL_TODO":
            return state.map(t => todo(t, action))
        default:
            return state
    }
};
const { combineReducers, createStore } = Redux;
const todoApp = combineReducers({
    todos: todos,
    visibilityFilter: visibilityFilter
})

const store = createStore(todoApp)

const { Component }  = React;

var nextTodoId = 0

class TodoApp extends Component {
    render(){
        return(
            <div>
                <input ref={node =>{
                    this.input = node
                }} />
                <button onClick={()=>{
                    store.dispatch({
                        type: "ADD_TODO",
                        text: this.input.value,
                        id: nextTodoId++
                    });
                    this.input.value = ''
                }}>Add Todo</button>
                <ul>
                    {this.props.todos.map(todo=>
                        <li key={todo.id} onClick={()=>{
                            store.dispatch({
                                type: "TOGAL_TODO",
                                id: todo.id
                            });
                        }} style={{textDecoration:
                            todo.completed ? 'line-through' : 'none'
                        }}>
                            {todo.text}
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

const render = () => {
    ReactDOM.render(<TodoApp todos={store.getState().todos} />, document.getElementById('root'))
}

store.subscribe(render)
render();