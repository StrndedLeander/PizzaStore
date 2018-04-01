import Api from '@/services/Api'

export default {
    fetchOrders(){
        return Api().get('management/orders')
    },
    addOrder(params){
        return Api().post('management/orders',params)
    },
    updateOrder(params){
        return Api().put('management/orders/'+params.id,params)
    },
    getOrder(params){
        return Api().get('management/orders/'+params.id)
    },
    deleteOrder(id){
        return Api().delete('management/orders'+id)
    }
}