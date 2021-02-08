import moment from 'moment';
 class Order {
    constructor(id, items, totalAmount, date) {
        this.id = id;
            this.items = items;
            this.totalAmount = totalAmount;
            this.date = date
    }
    //a clean way to format the js generated date
 get readAbleDate(){
     /*    return this.date.toLocaleDateString('en-EN',{
          year: 'numeric',
          month:'long',
          day:'numeric',
          hour:'2-digits',
          minute:'2-digits'
      })*/
            return moment(this.date).format('MMMM Do YYYY, h:m')
    }


}

export default Order