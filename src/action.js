export function selectOnFocus(node) {
    if (node && typeof node.select === 'function') {
        const onFocus = event => node.select()
        node.addEventListener('focus', onFocus) // this will select text when node (input) get focus
        return {
            destroy: () => node.removeEventListener('focus', onFocus) //destroy the event listener when node is removed from DOM
        }
    }

}