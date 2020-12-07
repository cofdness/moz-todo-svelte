<script>
    import FilterButton from "./FilterButton.svelte";
    import Todo from "./Todo.svelte";

    export let todos = [];

    $: totalTodos = todos.length
    $: completedTodos = todos.filter(todo => todo.completed).length

    function removeTodo(todo) {
        todos = todos.filter(t => t.id !== todo.id)
    }


    // new todo
    let newTodoName = ''

    let newTodoId
    $: {
        if (totalTodos === 0) {
            newTodoId = 1
        } else {
            newTodoId = Math.max(...todos.map(todo => todo.id)) + 1
        }
    }

    function addTodo() {
        todos = [...todos, {id: newTodoId, name: newTodoName, completed: false}];
        newTodoName = ''
    }

    function updateTodo(todo) {
        const index = todos.findIndex(t => t.id === todo.id)
        todos[index] = {...todos[index], ...todo}
    }

    // filter
    let filter = 'all'
    const filterTodos = (filter, todo) =>
            filter === 'active' ? todos.filter(t => !t.completed) :
                    filter === 'completed' ? todos.filter(t => t.completed) :
                            todos

</script>


<!-- Todos.svelte -->
<div class="todoapp stack-large">

    <!-- NewTodo -->
    <form on:submit|preventDefault={addTodo}>
        <h2 class="label-wrapper">
            <label for="todo-0" class="label__lg">
                What needs to be done?
            </label>
        </h2>
        <input type="text" id="todo-0" autocomplete="off"
               class="input input__lg" bind:value={newTodoName} />
        <button type="submit" disabled="" class="btn btn__primary btn__lg">
            Add
        </button>
    </form>

    <!-- Filter -->
    <FilterButton bind:filter/>

    <!-- TodosStatus -->
    <h2 id="list-heading">{completedTodos} out of {totalTodos} items completed</h2>

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
    <div class="btn-group">
        <button type="button" class="btn btn__primary">Check all</button>
        <button type="button" class="btn btn__primary">Remove completed</button>
    </div>

</div>