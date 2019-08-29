export class Order {
    constructor(
        public price: number,
        public city: string,
        public street: string,
        public shippingDate: string,
        public paymentMethod: string,
    ) {}
    
}