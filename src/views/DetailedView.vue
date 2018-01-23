<template>
   <div>
       Hi from detailed view!
       <button @click="$emit('back')">General</button>
       {{customer}}
   </div>
</template>

<script>
export default {
    name: 'detailed-view',
    props: ['customer']
}
</script>