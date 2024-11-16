<template>
    <!-- <VueNumberFormat :value="vmodel" class="form-control" :class="{'is-valid': vmodel >= 0, 'is-invalid': vmodel === 0}"></VueNumberFormat> -->

    <VueNumberFormat :value="vmodel" @input="updateValue" class="form-control" ></VueNumberFormat>
    

</template>
<script setup lang="ts">
    defineOptions({
        name: "FormCurrency"
    })

    import { defineProps, defineEmits } from 'vue';

    const emits = defineEmits(['update'])

    const props = defineProps({
        vmodel: {
            required: true,
            default: null
        }
    })

    function updateValue(event){
        console.log(event.target.value)
        emits('update', event.target.value)
    }
</script>
