<script>
	import ToDos from "./components/ToDos.svelte";
	import Alert from "./components/Alert.svelte";

	import {todos} from './stores'

	console.log('todos store - todos:', todos)
	console.log('todos store content - $todos:', $todos)


</script>

<main>
	<Alert />
	<ToDos bind:todos={$todos}/>
</main>

<style>

</style>