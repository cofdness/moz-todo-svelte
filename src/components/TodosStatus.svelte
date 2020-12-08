<script>
    export let todos

    $: totalTodos = todos.length
    $: completedTodos = todos.filter(todo => todo.completed).length

    let headingEl
    export function focus() {
        headingEl.focus()
    }
</script>

<h2 id="list-heading" tabindex="-1" bind:this={headingEl} >{completedTodos} out of {totalTodos} items completed</h2>