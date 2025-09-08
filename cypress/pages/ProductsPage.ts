export class ProductsPage {
  get addToCartButtons() {
    return cy.get('.add-to-cart');
  }

  get viewCartButton() {
    return cy.contains('View Cart');
  }

  addFirstProductToCart() {
    this.addToCartButtons.first().scrollIntoView().click({force: true});
  }

  addSecondProductToCart(productName: string) {
    cy.contains('.product-overlay', productName).find('.add-to-cart').click({force: true, multiple: true});
  }

  goToCart() {
    this.viewCartButton.click();
  }

  get productsButton() {
    return cy.get('a[href="/products"]');
  }

  get allProductsText() {
    return cy.contains('All Products');
  }

  get productsList() {
    return cy.get('.features_items .product-image-wrapper');
  }

  getViewProductButton() {
    return cy.get('.choose a');
  }

  viewProductButton(productIndex: number) {
    return cy.get('.features_items .col-sm-4').eq(productIndex - 1).find('.choose a');
  }

  get productNameDetail() {
    return cy.get('.product-information h2');
  }

  get productCategoryDetail() {
    return cy.get('.product-information p').contains('Category:');
  }

  get productPriceDetail() {
    return cy.get('.product-information span span');
  }

  get productAvailabilityDetail() {
    return cy.get('.product-information p').contains('Availability:');
  }

  get productConditionDetail() {
    return cy.get('.product-information p').contains('Condition:');
  }

  get productBrandDetail() {
    return cy.get('.product-information p').contains('Brand:');
  }

  get searchInput() {
    return cy.get('#search_product');
  }

  get searchButton() {
    return cy.get('#submit_search');
  }

  get searchedProductsText() {
    return cy.contains('Searched Products');
  }

  get allSearchedProducts() {
    return cy.get('.features_items .product-image-wrapper');
  }

  get cartButton() {
    return cy.get('a[href="/view_cart"]').first();
  }

  get continueShoppingButton() {
    return cy.get('.modal-footer button');
  }

  get productOneInCart() {
    return cy.get('.cart_info tbody tr').eq(0);
  }

  get productTwoInCart() {
    return cy.get('.cart_info tbody tr').eq(1);
  }

  get productOnePrice() {
    return cy.get('.cart_info tbody tr').eq(0).find('.cart_price');
  }

  get productTwoPrice() {
    return cy.get('.cart_info tbody tr').eq(1).find('.cart_price');
  }

  get productOneQuantity() {
    return cy.get('.cart_info tbody tr').eq(0).find('.cart_quantity');
  }

  get productTwoQuantity() {
    return cy.get('.cart_info tbody tr').eq(1).find('.cart_quantity');
  }

  get productOneTotalPrice() {
    return cy.get('.cart_info tbody tr').eq(0).find('.cart_total');
  }

  get productTwoTotalPrice() {
    return cy.get('.cart_info tbody tr').eq(1).find('.cart_total');
  }

  getRemoveFromCartButton(productIndex: number) {
    return cy.get('.cart_info tbody tr').eq(productIndex).find('.cart_delete a');
  }

  get cartEmptyMessage() {
    return cy.contains('Cart is empty!');
  }

  addProductToCartByName(productName: string) {
    this.allSearchedProducts.each(($el) => {
      cy.wrap($el).find('.productinfo.text-center p').then(($productName) => {
        if ($productName.text().includes(productName)) {
          cy.wrap($el).find('.add-to-cart').first().click({force: true});
        }
      });
    });
  }

  get brandsSidebar() {
    return cy.get('.brands_products');
  }

  get poloBrand() {
    return cy.get('a[href="/brand_products/Polo"]');
  }

  get hmBrand() {
    return cy.get('a[href="/brand_products/H&M"]');
  }
}

export default new ProductsPage();