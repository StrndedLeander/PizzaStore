import Api from '@/services/Api'

export default {
    fetchToppings(){
        return Api().get('management/toppings')
    },
    addTopping(params){
        return Api().post('management/toppings',params)
    },
    updateTopping(params){
        return Api().put('management/toppings/'+params.id,params)
    },
    getTopping(params){
        return Api().get('management/toppings/'+params.id)
    },
    deleteTopping(id){
        return Api().delete('/management/toppings'+id)
    }
}