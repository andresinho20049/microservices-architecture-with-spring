export const getRandomValue = (maxSize: number) => {
    return Math.floor(Math.random() * maxSize);
};

export const CurrencyNumber = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});