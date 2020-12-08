<script>
    import {createEventDispatcher, tick} from 'svelte'
    import {selectOnFocus} from '../action'

    export let todo
    const dispatch = createEventDispatcher()

    let editing = false
    let name = todo.name

    let saveOrCancelPressed = false

    const focusOnInit = (node) => node && typeof node.focus === 'function' && node.focus()
    const focusEditButton = node => saveOrCancelPressed && node && typeof node.focus === 'function' && node.focus()

    function update(updateTodo) {
        todo = {...todo, ...updateTodo}
        dispatch('update', todo)
    }

    function onEdit() {
        editing = true
        saveOrCancelPressed = false
    }

    function onSave() {
        update({name: name})
        editing = false
        saveOrCancelPressed = true
    }

    function onCancel() {
        name = todo.name
        editing = false
        saveOrCancelPressed = true
    }


</script>

<div class="stack-small">
    {#if editing}
    <form class="stack-small" on:submit|preventDefault={onSave} on:keydown={e=> e.key === 'Escape' && onCancel()}>
        <div class="form-group">
            <label for="todo-{todo.id}" class="todo-label">New name for '{todo.name}'</label>
            <input type="text"
                   bind:value={name}
                   use:selectOnFocus
                   use:focusOnInit
                   id="todo-{todo.id}" autocomplete="off" class="input input__md" />
        </div>
        <div class="btn-group">
            <button class="btn btn__primary todo-eidt">Save</button>
            <button class="btn todo-cancel" on:click={onCancel}>Cancel</button>
        </div>

    </form>
    {:else}
    <div class="c-cb">
        <input type="checkbox" id="todo-{todo.id}" checked={todo.completed} on:click={() => todo.completed = !todo.completed}/>
        <label for="todo-{todo.id}" class="todo-label">
            {todo.name}
        </label>
    </div>
    <div class="btn-group">
        <button type="button" class="btn"
                on:click={onEdit}
                use:focusEditButton>
            Edit <span class="visually-hidden">{todo.name}</span>
        </button>
        <button type="button" class="btn btn__danger" on:click={()=>dispatch('remove',todo)}>
            Delete <span class="visually-hidden">{todo.name}</span>
        </button>
    </div>
    {/if}
</div>