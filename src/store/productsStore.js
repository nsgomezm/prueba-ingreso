import { defineStore } from "pinia";
import { getDocs, addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { handleError } from "@/helpers/handleErrors";

import { db } from '@/config/firebase.config'
import Swal from "sweetalert2";

export const useProductsStore = defineStore('products', {
    state: () => ({
        _products: null,
        
    }),
    actions:{
        async store(form){
            const res = await addDoc(collection(db, "products"), {
                ...form
            })

            await this.getAllProducts()
            return res
        }, 
        async update(form){
            await updateDoc(doc(db, "products", form.id), {...form})
            await this.getAllProducts()
        }, 

        async findProduct(id){
            if(!this._products) await this.getAllProducts()
            
            // Primero se consulta en pinia 
            const indexState = this._products.findIndex(product => product.id == id)
            if(indexState){
                return this._products[indexState]
            }

            // Segunda busqueda en la BD
            const res = await getDoc(doc(db, 'products', id))
            if(res.exists()){
                const product = res.data()
                this._products.push(product)    

                return product
            }

            return null
        },

        async getAllProducts(){
            const res = await getDocs(collection(db, "products"))
            let products = []


            res.forEach(item => {
                let product = item.data()
                product.id = item.id
                products.push(product)
            })
            this._products = products
        },

        async confirmDelete(id){
            Swal.fire({
                title: 'confirmación necesaria!',
                html: '¿Estas seguro de eliminar este producto?, <br> <b>No lo volveras a recuperar</b>',
                showDenyButton: true,
                confirmButtonText: "Eliminar producto",
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
            })
        }, 
        async delete(id) {
            try{
                await deleteDoc(doc(db, "products", id))
                await this.getAllProducts()
                Swal.fire({
                    title: 'Producto eliminado',
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
        products: function(){
            return this._products
        },

        products: function(){
            if(!this._products) this.getAllProducts()

            return this._products
        }

    }
})