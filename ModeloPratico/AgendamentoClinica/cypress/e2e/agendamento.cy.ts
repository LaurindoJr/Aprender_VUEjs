describe('Fluxo de Agendamento de Consulta', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve navegar para a página de agendamento e verificar o formulário', () => {

    cy.contains('Agendamentos').click();
    cy.url().should('include', '/agendamento');

    cy.get('h1').contains('Agendamento de Consulta').should('be.visible');
    cy.get('form').should('be.visible');

    cy.get('input[placeholder="ID do Paciente"]').should('be.visible');
    cy.get('input[placeholder="ID do Médico"]').should('be.visible');
    cy.get('input[type="date"]').should('be.visible');
    cy.get('input[type="time"]').should('be.visible');
    cy.get('input[placeholder="Motivo da Consulta"]').should('be.visible');
    cy.get('select').should('be.visible');
    cy.get('button').contains('Agendar Consulta').should('be.visible');
  });


});
