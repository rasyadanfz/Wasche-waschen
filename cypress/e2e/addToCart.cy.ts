
describe('Add some clothes to cart',()=>{

    beforeEach(() => {
        cy.loginWithTestAccount("addToCart@gmail.com", "addToCart");

    });


    // add some clothes
    it('It should add some clothes',()=>{
        cy.get('*[class^="border flex flex-col justify-between my-5 items-start gap-4 shadow-md transition-transform "]')
            .find('button')
            .each(($button)=>{
                cy.wrap($button).click();
            });

        cy.get('*[class^="border flex flex-col justify-between my-5 items-start gap-4 shadow-md transition-transform "]')
           .find('#add_button')
           .each(($button)=>{
                cy.wrap($button).click();
           });

        cy.get('*[class^="text-button px-4 py-2 rounded-md font-raleway bg-secondary-400 hover:bg-secondary-300 active:bg-secondary-300 shadow-lg w-[300px] h-[40px]"]')
            .click();
    })



})