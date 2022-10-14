interface Carts {
    id:   string,
    name: string,
    tag: string,
    quantity: number,
    price:  number,
    file:   string,
    img:    string
}

export type cartsType = Carts[];