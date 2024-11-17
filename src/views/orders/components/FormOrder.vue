<template>
    <div class="row mb-4">
        <div class="col-12 mb-3">
            <FormKit autocomplete="off" type="text" label="Cliente" name="name" validation="required|string" v-model="form.customer_id"></FormKit>
        </div>
        <div class="col-12 col-lg-6 mb-3">
            <label class="form-label" required>Estado del pedido</label>
            <v-select autocomplete="off" :options="[ 'Activo', 'Inactivo', 'Entregado' ]" v-model="form.status"></v-select>
        </div>
        <div class="col-12  col-md-6 mb-3">
            <label class="form-label" required>Fecha</label>
            <FormDate autocomplete="off" v-model="form.date" locale="es" :flow="['month', 'day', 'time']" :format="getFormatDate" selectText="Seleccionar" cancel-text="Cancelar" :min-date="new Date()" ></FormDate>
        </div>
        <div class="col-12  col-lg-6 mb-3">
            <label class="form-label" required>Tipo de pago</label>
            <v-select autocomplete="off" :options="['Efectivo', 'Transferencia', 'Tarjeta' ]" v-model="form.payment_type"></v-select>
        </div>
        <div class="col-6 col-lg-6 mb-3">
            <label class="form-label">Total</label>
            <VueNumberFormat autocomplete="off" disabled :value="form.total ?? 0" class="form-control"></VueNumberFormat>
        </div>
        
        <div class="col-12 mb-3">
            <FormKit autocomplete="off" type="text" label="Dirección" name="address" validation="required|string" v-model="form.address"></FormKit>
        </div>
        <div class="col-12">
            <FormKit autocomplete="off" type="textarea" auto-height label="Comentarios"  v-model="form.comments"></FormKit>
        </div>
    </div> 
</template>

<script setup lang="ts">
    
    import { inject } from 'vue';
    import { format } from '@formkit/tempo'

    const form = inject('order')

    const getFormatDate = (date) => {
        return format(date, 'D/MMM/YYYY h:mm a')
    }
</script>