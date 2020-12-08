<script>
    import FilterButton from "./FilterButton.svelte";
    import Todo from "./Todo.svelte";
    import MoreActions from "./MoreActions.svelte";
    import NewTodo from "./NewTodo.svelte";
    import TodosStatus from "./TodosStatus.svelte";

    export let todos = [];

    function removeTodo(todo) {
        todos = todos.filter(t => t.id !== todo.id)
        todosStatusEl.focus()
    }


    // new todo
    let newTodoName = ''

    $: newTodoId = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1

    function addTodo(name) {
        todos = [...todos, {id: newTodoId, name: name, completed: false}];
    }

    function updateTodo(todo) {
        const index = todos.findIndex(t => t.id === todo.id)
        todos[index] = {...todos[index], ...todo}
    }

    //check all and remove complete
    const checkAllTodos = completed => {
        todos = todos.map(todo => ({...todo, completed: completed}))
    }

    const removeCompleted = () => {
        todos = todos.filter(todo => !todo.completed)
    }

    // filter
    let filter = 'all'
    const filterTodos = (filter, todo) =>
            filter === 'active' ? todos.filter(t => !t.completed) :
                    filter === 'completed' ? todos.filter(t => t.completed) :
                            todos

    //todostatus
    let todosStatusEl

</script>


<!-- Todos.svelte -->
<div class="todoapp stack-large">

    <!-- NewTodo -->
    <NewTodo autofocus on:addTodo={(e)=>addTodo(e.detail)} />

    <!-- Filter -->
    <FilterButton bind:filter/>

    <!-- TodosStatus -->
    <TodosStatus {todos} bind:this={todosStatusEl}/>

    <!-- Todos -->
    <ul role="list" class="todo-list stack-large" aria-labelledby="list-heading">
        {#each filterTodos(filter, todos) as todo (todo.id)}
            <li class="todo">
                <Todo {todo}
                      on:remove={e => removeTodo(e.detail)}
                      on:update={e => updateTodo(e.detail)}/>
            </li>
        {:else}
            <li>Nothing to do here!</li>
        {/each}

    </ul>

    <hr />

    <!-- MoreActions -->
    <MoreActions
            on:removeCompleted={removeCompleted}
            on:checkAll={e => checkAllTodos(e.detail)} />

</div>