/**
 * Возвращает краткие данные доступных товаров.
 *
 * Требования:
 * - оставить только товары с `available: true`;
 * - вернуть объекты формы `{ id, label, finalPrice }`;
 * - `label` состоит из очищенных от внешних пробелов brand и name,
 *   соединённых одним пробелом;
 * - `finalPrice` учитывает целочисленный `discountPercent`;
 * - отсортировать по finalPrice по возрастанию;
 * - при равной цене отсортировать по label по алфавиту;
 * - не изменять исходный массив и его объекты;
 * - пустой массив должен вернуть пустой массив.
 *
 * @param {Array<{
 *   id: number,
 *   brand: string,
 *   name: string,
 *   price: number,
 *   discountPercent: number,
 *   available: boolean
 * }>} products
 * @returns {Array<{ id: number, label: string, finalPrice: number }>}
 */
export function buildAvailableProductSummaries(products) {
  const availableProducts = products.filter(
    (product) => product.available === true,
  );

  const resultProducts = availableProducts.map((availableProduct) => {
    const label = `${availableProduct.brand.trim()} ${availableProduct.name.trim()}`;
    const finalPrice =
      availableProduct.price -
      (availableProduct.price / 100) * availableProduct.discountPercent;

    return {
      id: availableProduct.id,
      label,
      finalPrice,
    };
  });

  return resultProducts.toSorted((a, b) => {
    const sortedProducts = a.finalPrice - b.finalPrice;

    if (sortedProducts !== 0) {
      return sortedProducts;
    }

    return a.label.localeCompare(b.label);
  });
}
