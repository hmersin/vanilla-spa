describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/");

    // The root url should not have a selected node in navigation so the table should only have the header row
    cy.get("#node_list_table")?.find("tr").should("have.length", 1);
  });

  it("path /#/Configurable should display 1 header and 11 data rows", () => {
    cy.visit("/#/Configurable");
    cy.get("#node_list_table")?.find("tr").should("have.length", 12);
  });

  it("path /#/Configurable/optimizing node should be clicked and successfully navigated to that node", () => {
    cy.visit("/#/Configurable");
    cy.get("#Configurable li a")?.first()?.click();
    cy.get("#node_list_table")?.find("tr").should("have.length", 24);
  });

  it("in path #/Pixoboo/Viva, table item Youspan should be clickable and click should navigate to that node", () => {
    cy.visit("#/Pixoboo\/Viva");
    cy.get("#node_list_table tr")?.last().contains("Youspan").closest("a").click();
    cy.get("#node_list_table")?.find("tr").should("have.length", 5);
    cy.get("#Pixoboo\\/Viva > li > a > .icon")?.contains("▼");
  });
});
