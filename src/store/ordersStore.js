import { defineStore } from "pinia";
import { getDocs, addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { handleError } from "@/helpers/handleErrors";
import { format } from '@formkit/tempo'


import { db } from '@/config/firebase.config'
import Swal from "sweetalert2";

export const useOrdersStore = defineStore('orders', {
    state: () => ({
        _orders: null
    }),

    actions:{
        async store(form){
            const res = await addDoc(collection(db, 'orders'), {
                ...form
            })

            this.getAllOrders()

            const order = await this.findOrder(res.id, false)

            return order
        },

        async validStock(){

        },
        
        
        async update(form){
            await updateDoc(doc(db, 'orders', form.id), {...form})
            await this.getAllOrders()

        },

        async findOrder(id, searchInPinia=true){
            if(!this._orders) await this.getAllOrders()

             // Primero se consulta en pinia 
             const indexState = this._orders.findIndex(order => order.id == id)
            if(searchInPinia && indexState >= 0){
                const order = {...this._orders[indexState]}
                order.date = new Date(order.date.seconds * 1000)
                return order
            }

            // Segunda busqueda en la BD
            const res = await getDoc(doc(db, 'orders', id))
            if(res.exists()){
                const order = res.data()
                order.id = res.id
                order.date = new Date(order.date.seconds * 1000)
                return order
            }

            return null

        },

        async getAllOrders(){
            const res = await getDocs(collection(db, 'orders'))
            let orders = []

            res.forEach(item => {
                let order = item.data()
                order.id = item.id
                orders.push(order)
            })

            this._orders = orders
        },

        async confirmDelete(id, redirect = false){
            Swal.fire({
                title: 'confirmación necesaria!',
                html: '¿Estas seguro de eliminar esta orden?, <br> <b>No la volveras a recuperar</b>',
                showDenyButton: true,
                confirmButtonText: "Eliminar orden",
                denyButtonText: "Cancelar",
                icon: "question",
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !Swal.isLoading(),
                customClass:{
                    confirmButton: "btn btn-danger",
                    denyButton: "btn btn-outline-secondary ms-3"
                },
                preConfirm: async() => {
                    await this.delete(id)
                }
            }).then(() => redirect ? this.router.push({name:'orders'}) :  null)
        }, 
        async delete(id) {
            try{
                await deleteDoc(doc(db, "orders", id))
                await this.getAllOrders()
                Swal.fire({
                    title: 'Orden eliminada',
                    icon:'success'
                })
                return true
            } catch (error){
                console.log(error)
                handleError(error.code)
            }
        }
    },

    getters:{
        orders: function(){
            if(this._orders == null) this.getAllOrders()
            return this._orders
        }
    }
    
})