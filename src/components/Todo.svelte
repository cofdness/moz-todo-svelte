<script>
    import {createEventDispatcher} from 'svelte'

    export let todo
    const dispatch = createEventDispatcher()
    let editing = false
    let name = todo.name

    function update(updateTodo) {
        todo = {...todo, ...updateTodo}
        dispatch('update', todo)
    }

    function onEdit() {
        editing = true
    }

    function onSave() {
        update({name: name})
        editing = false
    }

    function onCancel() {
        name = todo.name
        editing = false
    }
</script>

<div class="stack-small">
    {#if editing}
    <form class="stack-small" on:submit|preventDefault={onSave} on:keydown={e=> e.key === 'Escape' && onCancel()}>
        <div class="form-group">
            <label for="todo-{todo.id}" class="todo-label">New name for '{todo.name}'</label>
            <input type="text" bind:value={name} id="todo-{todo.id}" autocomplete="off" calss="todo-text" />
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
        <button type="button" class="btn" on:click={onEdit}>
            Edit <span class="visually-hidden">{todo.name}</span>
        </button>
        <button type="button" class="btn btn__danger" on:click={()=>dispatch('remove',todo)}>
            Delete <span class="visually-hidden">{todo.name}</span>
        </button>
    </div>
    {/if}
</div>