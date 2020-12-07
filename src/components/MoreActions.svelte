<script>
    import {createEventDispatcher} from 'svelte'

    const dispatch = createEventDispatcher()

    const checkAll = () => {
        dispatch('checkAll', completed)
        completed = !completed
    }

    const removeCompleted = () => {
        dispatch('removeCompleted')
    }

    let completed = true
</script>

<div class="btn-group">
    <button type="button" class="btn btn__primary" on:click={checkAll}>{completed === true ? 'Checked all' : 'Unchecked all'}</button>
    <button type="button" class="btn btn__primary" on:click={removeCompleted}>Remove completed</button>
</div>