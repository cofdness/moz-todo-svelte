<script>
    import {alert} from '../stores'
    export let filter = 'all'

    $: {
        if (filter === 'all')       $alert = 'Browsing all todos'
        else if (filter === 'active') $alert = 'Browsing active todos'
        else if (filter === 'completed') $alert = 'Browsing completed todos'
    }

</script>

<div class="filters btn-group stack-exception">
    <button class="btn toggle-btn" class:btn_primary={filter === 'all'} aria-pressed={filter === 'all'} on:click={() => filter = 'all'}>
        <span class="visually-hidden">Show</span>
        <span>All</span>
        <span class="visually-hidden">tasks</span>
    </button>
    <button class="btn toggle-btn" class:btn_primary={filter === 'active'} aria-pressed="{filter === 'active'}" on:click={() => filter = 'active'}>
        <span class="visually-hidden">Show</span>
        <span>Active</span>
        <span class="visually-hidden">tasks</span>
    </button>
    <button class="btn toggle-btn" class:btn_primary={filter === 'completed'} aria-pressed="{filter === 'completed'}" on:click={() => filter = 'completed'}>
        <span class="visually-hidden">Show</span>
        <span>Completed</span>
        <span class="visually-hidden">tasks</span>
    </button>
</div>